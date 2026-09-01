import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";
import "./styles/course.css";
export { courseApiCollections, graphCollections } from "./course-api";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Change them to Studios, Tutorials, Expeditions, etc.
export const sessionLabels = {
  singular: "Champion Lab",
  plural: "Champion Labs",
} as const;

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "SLOP3745 // LEAGUE MASTERY",
  logo: undefined,
  logoDark: undefined,
  logoCompact: undefined,
  logoCompactDark: undefined,
  colorScheme: "dark",

  links: [
    { text: "Start", href: "/" },
    { text: "Lectures", href: "/lectures/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Matchup Atlas", href: "/tools/matchup-atlas/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg",
  socialImageAlt: `Official Volibear splash artwork used for the ${courseMeta.code} champion-mastery course preview`,
});
