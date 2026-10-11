// Unisce i contenuti modificati dal pannello in un unico data.json e prepara la cartella "dist" per Vercel.
import { readFileSync, readdirSync, existsSync, mkdirSync, rmSync, cpSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const readJson = (p, fallback) => { try { return JSON.parse(readFileSync(p, "utf8")); } catch { return fallback; } };
const readFolder = dir => existsSync(dir)
  ? readdirSync(dir).filter(f => f.endsWith(".json")).map(f => ({ id: f.replace(/\.json$/, ""), ...readJson(join(dir, f), {}) }))
  : [];

const data = {
  site: readJson("content/sito.json", {}),
  costs: readJson("content/costi.json", {}),
  missions: readFolder("content/missioni").filter(m => m.name && m.visibile !== false),
  trips: readFolder("content/viaggi").filter(t => t.date && t.visibile !== false),
};

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("index.html", "dist/index.html");
if (existsSync("public")) cpSync("public", "dist", { recursive: true });
writeFileSync("dist/data.json", JSON.stringify(data));
console.log(`OK: ${data.missions.length} missioni, ${data.trips.length} viaggi`);
