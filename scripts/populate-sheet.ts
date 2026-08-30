/**
 * Populates the RKC Technology content-review Google Sheet from the JSON
 * dictionaries in content/. Run with: npx tsx scripts/populate-sheet.ts
 *
 * Requires:
 *   - google-credentials.json (service-account key) in the project root
 *   - GOOGLE_SHEET_ID set in .env.local
 */

import fs from "fs";
import path from "path";
import { google } from "googleapis";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS_PATH = path.join(process.cwd(), "google-credentials.json");
const CONTENT_DIR = path.join(process.cwd(), "content");

const HEADERS = ["key (do not edit)", "Section", "What is this text?", "TEXT — EDIT HERE"];

interface ContentRow {
  key: string;
  section: string;
  description: string;
  text: string;
}

interface RouteConfig {
  file: string;
  tab: string;
  route: string;
}

const ROUTES: RouteConfig[] = [
  { file: "home.json", tab: "Home", route: "/" },
  { file: "about.json", tab: "About", route: "/about" },
  { file: "contact.json", tab: "Contact", route: "/contact" },
  { file: "privacy.json", tab: "Privacy", route: "/privacy" },
  { file: "terms.json", tab: "Terms", route: "/terms" },
  { file: "hydrus.json", tab: "Hydrus", route: "/products/hydrus" },
  { file: "subsonus.json", tab: "Subsonus", route: "/products/subsonus" },
  { file: "subsonus-tag.json", tab: "Subsonus Tag", route: "/products/subsonus-tag" },
  { file: "gnss-compass.json", tab: "GNSS Compass", route: "/products/gnss-compass" },
];

async function main() {
  if (!SHEET_ID) {
    console.error("[populate-sheet] Missing GOOGLE_SHEET_ID — set it in .env.local");
    process.exit(1);
  }
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`[populate-sheet] Missing credentials file at ${CREDENTIALS_PATH}`);
    process.exit(1);
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  console.log(`[populate-sheet] Target spreadsheet: ${SHEET_ID}\n`);

  // 1. Discover existing tabs
  let meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  let existingTitles = new Set((meta.data.sheets ?? []).map((s) => s.properties?.title));

  // 2. Create any missing tabs
  const missing = ROUTES.filter((r) => !existingTitles.has(r.tab));
  if (missing.length > 0) {
    console.log(`Creating ${missing.length} missing tab(s): ${missing.map((r) => r.tab).join(", ")}`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: {
        requests: missing.map((r) => ({ addSheet: { properties: { title: r.tab } } })),
      },
    });
    meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
    existingTitles = new Set((meta.data.sheets ?? []).map((s) => s.properties?.title));
  } else {
    console.log("All 9 tabs already exist.");
  }

  const sheetIdByTitle = new Map<string, number>();
  for (const s of meta.data.sheets ?? []) {
    if (s.properties?.title != null && s.properties?.sheetId != null) {
      sheetIdByTitle.set(s.properties.title, s.properties.sheetId);
    }
  }

  // 3. Write header + content rows, and format the header row, per tab
  const formattingRequests: import("googleapis").sheets_v4.Schema$Request[] = [];

  for (const r of ROUTES) {
    const contentPath = path.join(CONTENT_DIR, r.file);
    const rows: ContentRow[] = JSON.parse(fs.readFileSync(contentPath, "utf-8"));
    const values = [HEADERS, ...rows.map((row) => [row.key, row.section, row.description, row.text])];

    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: `'${r.tab}'!A:D`,
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `'${r.tab}'!A1`,
      valueInputOption: "RAW",
      requestBody: { values },
    });

    console.log(`Populated "${r.tab}" — ${rows.length} rows (route ${r.route})`);

    const sheetId = sheetIdByTitle.get(r.tab);
    if (sheetId != null) {
      formattingRequests.push(
        {
          repeatCell: {
            range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true }, backgroundColor: { red: 0.92, green: 0.94, blue: 0.98 } } },
            fields: "userEnteredFormat(textFormat,backgroundColor)",
          },
        },
        {
          updateSheetProperties: {
            properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
            fields: "gridProperties.frozenRowCount",
          },
        }
      );
    }
  }

  if (formattingRequests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SHEET_ID,
      requestBody: { requests: formattingRequests },
    });
  }

  // 4. Verify
  console.log("\nVerifying all 9 tabs...");
  const verifyMeta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID });
  const finalTitles = new Set((verifyMeta.data.sheets ?? []).map((s) => s.properties?.title));

  let allOk = true;
  for (const r of ROUTES) {
    const ok = finalTitles.has(r.tab);
    if (!ok) allOk = false;
    console.log(`${ok ? "OK " : "MISSING"} — ${r.tab}`);
  }

  if (!allOk) {
    console.error("\n[populate-sheet] One or more tabs failed to populate.");
    process.exit(1);
  }
  console.log("\nAll 9 tabs populated successfully.");
}

main().catch((err) => {
  console.error("[populate-sheet] Failed:", err);
  process.exit(1);
});
