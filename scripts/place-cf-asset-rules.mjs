import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const destDir = join(root, ".open-next", "assets");

mkdirSync(destDir, { recursive: true });

for (const name of ["_headers", "_redirects"]) {
  const src = join(root, "public", name);
  if (existsSync(src)) {
    copyFileSync(src, join(destDir, name));
  }
}
