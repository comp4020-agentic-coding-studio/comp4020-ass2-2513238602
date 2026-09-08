import { spawnSync } from "node:child_process";

const diff = spawnSync(
  "git",
  ["diff", "--cached", "--no-ext-diff", "--no-color", "--unified=0"],
  { encoding: "utf8", windowsHide: true },
);
if (diff.status !== 0) process.exit(diff.status ?? 1);

const keyPattern = /sk-[A-Za-z0-9_-]{20,}/g;
let file = "unknown file";
const hits = [];
for (const line of diff.stdout.split(/\r?\n/)) {
  if (line.startsWith("+++ b/")) {
    file = line.slice(6);
    continue;
  }
  if (!line.startsWith("+") || line.startsWith("+++")) continue;
  for (const match of line.matchAll(keyPattern)) {
    if (/[A-Z]/.test(match[0])) hits.push(file);
  }
}

if (hits.length) {
  console.error("commit blocked: something staged looks like an API key");
  for (const hit of new Set(hits)) console.error(`  ${hit}`);
  console.error("Remove it from the file, re-stage, and rotate any key already pushed.");
  process.exit(1);
}
