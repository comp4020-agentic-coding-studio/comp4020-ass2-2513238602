import type { ImageMetadata } from "astro";

const splashModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/riot/splashes/*.webp",
  { eager: true },
);
const portraitModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/riot/portraits/*.webp",
  { eager: true },
);
const abilityModules = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/riot/abilities/*.webp",
  { eager: true },
);

function asset(
  modules: Record<string, { default: ImageMetadata }>,
  folder: "splashes" | "portraits" | "abilities",
  id: string,
) {
  const key = `/src/assets/riot/${folder}/${id}.webp`;
  const image = modules[key]?.default;
  if (!image) throw new Error(`Missing cached Riot asset: ${key}`);
  return image;
}

export const splash = (id: string) => asset(splashModules, "splashes", id);
export const portrait = (id: string) => asset(portraitModules, "portraits", id);
export const ability = (id: string) => asset(abilityModules, "abilities", id);
