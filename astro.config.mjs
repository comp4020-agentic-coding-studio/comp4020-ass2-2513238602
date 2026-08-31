import { defineConfig } from "astro/config";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { registerHooks, stripTypeScriptTypes } from "node:module";

// The starter integrations deliberately publish TypeScript source. Vite loads
// that directly on Unix, but Vite 8's Windows config runner currently treats
// nested CommonJS helpers as ESM. Let Node 24 load the same source natively on
// Windows, with a narrow hook for TypeScript files inside dependencies.
if (process.platform === "win32") {
  registerHooks({
    resolve(specifier, context, nextResolve) {
      try {
        return nextResolve(specifier, context);
      } catch (error) {
        if (specifier.endsWith(".js") && context.parentURL?.includes("/node_modules/")) {
          const candidate = new URL(specifier.replace(/\.js$/, ".ts"), context.parentURL);
          if (existsSync(fileURLToPath(candidate))) {
            return { url: candidate.href, shortCircuit: true };
          }
        }
        throw error;
      }
    },
    load(url, context, nextLoad) {
      if (url.endsWith(".ts") && url.includes("/node_modules/")) {
        const source = readFileSync(fileURLToPath(url), "utf8");
        return {
          format: "module",
          source: stripTypeScriptTypes(source, {
            mode: "transform",
            sourceMap: true,
            sourceUrl: url,
          }),
          shortCircuit: true,
        };
      }
      return nextLoad(url, context);
    },
  });
}

const [
  { default: courseGraph },
  { default: universityTheme },
  { astromotion, deckRemarkPlugins },
  { courseMeta },
  { courseApiCollections },
  { gitOrigin, resolveDeployment },
] = await Promise.all([
  import("astro-course-university"),
  import("astro-theme-university"),
  import("astromotion"),
  import("./src/course-config.ts"),
  import("./src/course-api.ts"),
  import("./scripts/pages-base.ts"),
]);

const { site, base } = resolveDeployment(process.env, gitOrigin);

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [
    universityTheme({
      defaultLayout: "src/layouts/PageLayout.astro",
      brandCss: "astro-theme-slop/slop.css",
      imageFormat: "avif",
      llmsTxt: true,
      search: false,
      extraRemarkPlugins: deckRemarkPlugins,
    }),
    courseGraph({
      collections: courseApiCollections,
      timezone: "Australia/Canberra",
      course: courseMeta,
      canonicalUrl: `https://courses.slop.university/${courseMeta.code}/`,
    }),
    astromotion({
      theme: "./src/decks/theme.css",
      fontVariables: ["--font-public-sans"],
    }),
  ],
  vite: {
    environments: {
      astro: {
        optimizeDeps: {
          include: ["picomatch", "source-map-js"],
        },
      },
    },
    optimizeDeps: {
      include: ["picomatch", "source-map-js", "aria-query", "axobject-query", "html-escaper"],
    },
  },
});
