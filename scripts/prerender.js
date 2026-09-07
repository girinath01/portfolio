import fs from "node:fs";
import path from "node:path";
import server from "../dist/server/server.js";

async function prerender() {
  const req = new Request("http://localhost:3000/");
  const res = await server.fetch(req);
  const html = await res.text();
  const outPath = path.resolve("dist/client/index.html");
  fs.writeFileSync(outPath, html, "utf8");
  console.log("Successfully generated dist/client/index.html for Vercel deployment!");
}

prerender().catch((err) => {
  console.error("Prerender error:", err);
  process.exit(1);
});
