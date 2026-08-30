export type ContentMap = Record<string, string>;

export interface ContentRow {
  key: string;
  section?: string;
  description?: string;
  text: string;
}

/**
 * RFC 4180 CSV parser. Handles quoted fields, escaped ("") quotes inside
 * quoted fields, commas and line breaks inside quoted fields, and both
 * \n and \r\n line endings. Dependency-free by design — this runs at
 * request time on every page render.
 */
export function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;
  const len = csvText.length;

  while (i < len) {
    const char = csvText[i];

    if (inQuotes) {
      if (char === '"') {
        if (csvText[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += char;
      i++;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i++;
      continue;
    }

    if (char === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }

    if (char === "\r") {
      i++;
      continue;
    }

    if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }

    field += char;
    i++;
  }

  // Flush the final field/row for CSVs that don't end with a trailing newline.
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  // Drop fully-blank trailing rows (a lone empty string), which Google
  // Sheets' CSV export sometimes appends.
  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

/**
 * Case-insensitive column matcher. Column headers in the sheet are
 * human-authored ("key (do not edit)", "TEXT — EDIT HERE") so we match by
 * prefix rather than exact string.
 */
export function findColumn(headers: string[], prefix: string): number {
  const lowerPrefix = prefix.toLowerCase();
  return headers.findIndex((h) => h.trim().toLowerCase().startsWith(lowerPrefix));
}

/**
 * Fetches a published Google Sheet tab as CSV and parses it into a
 * { key: text } map. Never throws — any failure (missing URL, network
 * error, malformed CSV, missing columns) resolves to an empty object so
 * callers can safely layer it over local fallback content.
 */
export async function fetchContent(csvUrl?: string): Promise<ContentMap> {
  if (!csvUrl) return {};

  try {
    const bustCacheUrl = `${csvUrl}&_t=${Date.now()}`;
    const res = await fetch(bustCacheUrl, { next: { revalidate: 60 } });
    if (!res.ok) return {};

    const csvText = await res.text();
    const rows = parseCsv(csvText);
    if (rows.length < 2) return {};

    const headers = rows[0];
    const keyIdx = findColumn(headers, "key");
    const textIdx = findColumn(headers, "text");
    if (keyIdx === -1 || textIdx === -1) return {};

    const content: ContentMap = {};
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const key = row[keyIdx]?.trim();
      if (!key) continue;
      content[key] = row[textIdx] ?? "";
    }
    return content;
  } catch {
    return {};
  }
}

/** Converts a content/*.json row array into a { key: text } fallback map. */
export function toFallbackMap(rows: ContentRow[]): ContentMap {
  const map: ContentMap = {};
  for (const row of rows) {
    map[row.key] = row.text ?? "";
  }
  return map;
}

/**
 * Merges live sheet text over local fallback content. A blank cell in the
 * sheet does NOT blank out the page — it falls back to the local value, so
 * an accidental empty edit in the spreadsheet can't take down a section.
 */
export function getContent(sheetMap: ContentMap, fallbackMap: ContentMap): ContentMap {
  const merged: ContentMap = { ...fallbackMap };
  for (const [key, value] of Object.entries(sheetMap)) {
    if (value && value.trim().length > 0) {
      merged[key] = value;
    }
  }
  return merged;
}
