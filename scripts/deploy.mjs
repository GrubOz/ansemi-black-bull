import { cpSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const out = "_deploy";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync("index.html", `${out}/index.html`);
cpSync("assets", `${out}/assets`, { recursive: true });

const result = spawnSync("npx", ["wrangler", "deploy"], {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status ?? 1);
