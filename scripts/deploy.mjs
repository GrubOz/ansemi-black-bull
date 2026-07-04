import { cpSync, mkdirSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const out = "_deploy";
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync("index.html", `${out}/index.html`);
cpSync("assets", `${out}/assets`, { recursive: true });

const result = spawnSync(
  "npx",
  ["wrangler", "pages", "deploy", out, "--project-name=ansemi-black-bull", "--branch=main", "--commit-dirty=true"],
  { stdio: "inherit", shell: true }
);

process.exit(result.status ?? 1);
