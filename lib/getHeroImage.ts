import fs from "fs";
import path from "path";

const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png"];

export function getHeroImage(slug: string): string | null {
  const dir = path.join(process.cwd(), "public", "images", slug);
  for (const ext of EXTENSIONS) {
    try {
      const filePath = path.join(dir, `hero${ext}`);
      if (fs.existsSync(filePath)) {
        return `/images/${slug}/hero${ext}`;
      }
    } catch {
      // ignore
    }
  }
  return null;
}
