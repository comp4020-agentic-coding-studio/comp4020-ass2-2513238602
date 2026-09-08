import { spawnSync } from "node:child_process";

const insideRepository = spawnSync("git", ["rev-parse", "--git-dir"], {
  stdio: "ignore",
  windowsHide: true,
}).status === 0;

if (insideRepository) {
  const configured = spawnSync("git", ["config", "core.hooksPath", ".githooks"], {
    stdio: "inherit",
    windowsHide: true,
  });
  if (configured.status !== 0) process.exit(configured.status ?? 1);
}
