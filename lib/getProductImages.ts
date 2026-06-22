import fs from "fs";
import path from "path";

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export interface ProductImage {
  src: string;
  alt: string;
}

export function getProductImages(folder: string, altPrefix: string): ProductImage[] {
  const dir = path.join(process.cwd(), "public", "images", folder);

  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    // Folder doesn't exist yet — return empty list, gallery shows no slots
    return [];
  }

  const images = files
    .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
    .sort((a, b) => {
      // Natural numeric sort so hydrus-02 comes before hydrus-10
      const numA = parseInt(a.match(/(\d+)/)?.[1] ?? "0", 10);
      const numB = parseInt(b.match(/(\d+)/)?.[1] ?? "0", 10);
      return numA - numB;
    })
    .map((f, i) => ({
      src: `/images/${folder}/${f}`,
      alt: `${altPrefix} — image ${i + 1}`,
    }));

  return images;
}
