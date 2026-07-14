const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const APP_DIR = path.join(ROOT, "app");
const results = {};

function gitDate(relPath) {
  try {
    return execSync(`git log -1 --format=%cd --date=short -- "${relPath}"`, {
      cwd: ROOT,
    })
      .toString()
      .trim();
  } catch {
    return "";
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === "page.tsx") {
      const rel = path.relative(ROOT, full).split(path.sep).join("/");
      const committedDate = gitDate(rel);
      // Untracked or uncommitted changes: fall back to today so the page still shows a fresh date.
      results[rel] = committedDate || new Date().toISOString().slice(0, 10);
    }
  }
}

walk(APP_DIR);

fs.writeFileSync(
  path.join(ROOT, "lib", "last-updated.json"),
  JSON.stringify(results, null, 2) + "\n"
);

console.log(`Generated last-updated.json for ${Object.keys(results).length} pages.`);
