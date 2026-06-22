import fs from "fs";
import path from "path";

export interface HydrusVideos {
  autonomous: string | null; // src for "Truly Autonomous" section
  imagery: string | null;    // src for "Stunning Imagery" section
}

export function getHydrusVideos(): HydrusVideos {
  const dir = path.join(process.cwd(), "public", "videos", "hydrus");

  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".mp4"));
  } catch {
    return { autonomous: null, imagery: null };
  }

  // Semantic match: prefer filenames containing navigation/autonomy keywords
  // for the first slot, imagery/camera keywords for the second.
  // Falls back to alphabetical order (first file → autonomous, second → imagery).
  const autonomyKeywords = /autonom|navig|dvl|ins|usbl/i;
  const imageryKeywords = /imag|camera|4k|video|visual/i;

  let autonomousFile: string | null = null;
  let imageryFile: string | null = null;

  for (const f of files) {
    if (!autonomousFile && autonomyKeywords.test(f)) autonomousFile = f;
    else if (!imageryFile && imageryKeywords.test(f)) imageryFile = f;
  }

  // If semantic match didn't work, fall back to sorted order
  const sorted = [...files].sort();
  if (!autonomousFile && !imageryFile) {
    autonomousFile = sorted[0] ?? null;
    imageryFile = sorted[1] ?? null;
  } else if (!autonomousFile) {
    // imagery was matched; assign remaining first sorted file to autonomous
    const remaining = sorted.filter((f) => f !== imageryFile);
    autonomousFile = remaining[0] ?? null;
  } else if (!imageryFile) {
    const remaining = sorted.filter((f) => f !== autonomousFile);
    imageryFile = remaining[0] ?? null;
  }

  return {
    autonomous: autonomousFile ? `/videos/hydrus/${autonomousFile}` : null,
    imagery: imageryFile ? `/videos/hydrus/${imageryFile}` : null,
  };
}
