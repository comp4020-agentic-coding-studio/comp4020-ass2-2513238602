# Process overview

## What I built

SLOP3745 is the League of Legends course I wanted but could not find: twelve weeks devoted to mastering one champion deeply enough that “counter” stops being a tier-list verdict and becomes a testable claim. Students choose one champion and role; Volibear top is the worked example. The site carries one improvement loop—plan, drill, test, review, revise—through mechanics, lane matchups, and global decisions. The curriculum culminates in a full-roster interaction atlas and three-cycle re-tests of the ten hardest interactions identified by each student's own evidence.

![SLOP3745 Champion Mastery social card](src/assets/images/champion-mastery-card.png)

## How I got here

The first design was a general MOBA performance course. That scope made it easy to generate plausible weekly topics but hard to make any one promise concrete. I redirected the work around a sharper prompt:

> “Make the course directly about League of Legends. A student who chooses Volibear must practise it against every champion and in the full game, so every counter becomes understandable.”

I treated that as a coverage problem at two resolutions. Likely lane opponents receive repeatable one-versus-one protocols; every champion receives a global interaction entry; uncertain or high-impact cases are promoted into direct testing. This avoids pretending that 173 identical lane drills would be rigorous while still making the whole roster visible. The resulting structure—12 lectures, 12 Champion Labs, 20/40/40 assessment, the complete atlas, the Volibear scenario composer, and the course-specific harness—is recorded in [`5a6bd29`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-2513238602/commit/5a6bd29).

The harness became more useful when it rejected claims rather than merely prescribing outputs. It requires conditions and re-test triggers for “mastered”, official versioned roster data, base-aware internal links, and a full build before a feature can be accepted. I added tests for the promises the platform could not infer: one lecture and lab in every week, all five loop stages, assessment totalling 100%, a policy API node, 173 unique roster entries, ten priority re-tests, and one persistent status control per champion.

The most important technical failure was Windows loading the template's published TypeScript integrations through Vite 8's module runner as if nested CommonJS helpers were ESM. Reinstalling dependencies did not change the failure. I moved config loading onto Node 24's native path with a narrow Windows-only TypeScript hook, then configured the Astro content environment to pre-bundle the two CommonJS helpers it actually needed. This fixed the cause without replacing the provided integrations or course API.

My first complete build exposed a quieter quality problem: custom index and tool pages duplicated the layout's `h1`. I audited the generated HTML, removed the redundant headings, widened only the pages that benefited from it, and made atlas persistence fail soft when storage is unavailable. That review is isolated in [`5202188`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-2513238602/commit/5202188).

I accepted the first implementation only after `pnpm check` produced zero Astro diagnostics, built 40 pages, found no axe or broken-link violations, verified every GitHub Pages base-path link, generated a 31-node course API, checked the Astromotion deck, and passed all eight spec tests. Review then exposed a different failure: the interface was structurally complete but visually too close to a generic university information system. I treated that feedback as another course loop. The revision in [`7d31e7e`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-2513238602/commit/7d31e7e) replaced the pale schematic treatment with a dark competitive-training identity and used official Riot Data Dragon artwork for honest subject recognition: a full Volibear hero, 173 champion portraits in the atlas, ability icons in the worked playbook, and individual splash art across lectures, labs, assessments, and course pathways. Source and non-endorsement notes remain visible. The final result is deliberately not a build guide: it is a system for proving, revising, and maintaining what a player thinks they know.
