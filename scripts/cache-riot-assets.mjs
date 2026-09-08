import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { champions, dataDragonVersion } from "../src/data/champions.ts";

const root = resolve("src/assets/riot");
const splashIds = [
  "Volibear", "Riven", "Gnar", "Jax", "LeeSin", "Ornn", "Fiora",
  "TwistedFate", "Shen", "Malphite", "Viego", "Ryze", "Camille",
  "Renekton", "Gwen", "Kennen", "Vayne",
];
const abilityIds = ["VolibearQ", "VolibearW", "VolibearE", "VolibearR"];

const sources = {
  portrait: (id) => `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/champion/${id}.png`,
  splash: (id) => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`,
  ability: (id) => `https://ddragon.leagueoflegends.com/cdn/${dataDragonVersion}/img/spell/${id}.png`,
};
const folders = { portrait: "portraits", splash: "splashes", ability: "abilities" };

async function download(kind, id, transform) {
  const url = sources[kind](id);
  const output = resolve(root, folders[kind], `${id}.webp`);
  if (existsSync(output)) {
    return { kind, id, source: url, file: output.replace(resolve("."), "").replaceAll("\\", "/") };
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const input = Buffer.from(await response.arrayBuffer());
  await mkdir(resolve(root, folders[kind]), { recursive: true });
  await transform(sharp(input)).webp({ quality: 82, smartSubsample: true }).toFile(output);
  return { kind, id, source: url, file: output.replace(resolve("."), "").replaceAll("\\", "/") };
}

const records = [];
for (const champion of champions) {
  records.push(await download("portrait", champion.id, (image) => image.resize(160, 160, { fit: "cover" })));
}
for (const id of splashIds) {
  records.push(await download("splash", id, (image) => image.resize({ width: 1600, withoutEnlargement: true })));
}
for (const id of abilityIds) {
  records.push(await download("ability", id, (image) => image.resize(96, 96, { fit: "cover" })));
}

await writeFile(
  resolve(root, "manifest.json"),
  `${JSON.stringify({ dataDragonVersion, generatedAt: new Date().toISOString(), records }, null, 2)}\n`,
);
console.log(`Cached ${records.length} Riot Data Dragon assets in ${root}`);
