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

// Cambio AED -> EUR: automatico (aggiornato a ogni pubblicazione) oppure quello scritto nel pannello.
const manual = Number(data.site.cambio_aed_eur) > 0 ? Number(data.site.cambio_aed_eur) : 0.243;
data.rate = { aed_eur: manual, source: "manuale" };
if (data.site.cambio_automatico !== false) {
  try {
    const r = await fetch("https://open.er-api.com/v6/latest/AED", { signal: AbortSignal.timeout(8000) });
    const j = await r.json();
    const eur = Number(j?.rates?.EUR);
    if (j?.result === "success" && eur > 0 && eur < 10) data.rate = { aed_eur: eur, source: "automatico", updated: j.time_last_update_utc };
  } catch (e) { console.log("Cambio automatico non disponibile, uso quello del pannello:", manual); }
}

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("index.html", "dist/index.html");
if (existsSync("public")) cpSync("public", "dist", { recursive: true });
writeFileSync("dist/data.json", JSON.stringify(data));
console.log(`OK: ${data.missions.length} missioni, ${data.trips.length} viaggi, 1 AED = ${data.rate.aed_eur} EUR (${data.rate.source})`);
