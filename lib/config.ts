// Published Google Sheets CSV export URLs, one per route/tab. Each is
// optional — an empty string means fetchContent() returns {} and the page
// renders entirely from its local content/*.json fallback.
export const SHEET_CSV_HOME = process.env.NEXT_PUBLIC_SHEET_CSV_HOME || "";
export const SHEET_CSV_ABOUT = process.env.NEXT_PUBLIC_SHEET_CSV_ABOUT || "";
export const SHEET_CSV_CONTACT = process.env.NEXT_PUBLIC_SHEET_CSV_CONTACT || "";
export const SHEET_CSV_HYDRUS = process.env.NEXT_PUBLIC_SHEET_CSV_HYDRUS || "";
export const SHEET_CSV_SUBSONUS = process.env.NEXT_PUBLIC_SHEET_CSV_SUBSONUS || "";
export const SHEET_CSV_SUBSONUS_TAG = process.env.NEXT_PUBLIC_SHEET_CSV_SUBSONUS_TAG || "";
export const SHEET_CSV_GNSS_COMPASS = process.env.NEXT_PUBLIC_SHEET_CSV_GNSS_COMPASS || "";
export const SHEET_CSV_PRIVACY = process.env.NEXT_PUBLIC_SHEET_CSV_PRIVACY || "";
export const SHEET_CSV_TERMS = process.env.NEXT_PUBLIC_SHEET_CSV_TERMS || "";
