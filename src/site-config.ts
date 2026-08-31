import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";
export { courseApiCollections, graphCollections } from "./course-api";

// The underlying collection and URL remain `sessions`; these labels are the
// language students see. Change them to Studios, Tutorials, Expeditions, etc.
export const sessionLabels = {
  singular: "Champion Lab",
  plural: "Champion Labs",
} as const;

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Start", href: "/" },
    { text: "Lectures", href: "/lectures/" },
    { text: sessionLabels.plural, href: "/sessions/" },
    { text: "Matchup Atlas", href: "/tools/matchup-atlas/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "Policies", href: "/policies/" },
  ],

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/champion-mastery-card.png",
  socialImageAlt: `An editorial training poster for ${courseMeta.code}: abstract storm-bear energy above a top-lane practice map`,
});
