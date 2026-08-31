# SLOP3745 project harness

Build a complete, fictional Slop University course site for **League of Legends Champion Mastery**. The reader is a student choosing one champion and one role; Volibear top is the worked example, not the required student choice.

## Non-negotiable course promise

- Improvement is a repeating **plan → drill → test → review → revise** loop.
- The course runs that loop at three scales: mechanics, matchup, and global decision-making.
- Common lane opponents receive controlled one-versus-one tests. The full champion roster receives an interaction plan. The ten hardest interactions identified by the student's evidence receive three re-test cycles.
- “Counter” is a conditional, testable claim. Do not present a live tier list or an unsupported champion-versus-champion verdict as course truth.
- Every “mastered” claim must point to evidence and state a future re-test trigger.

## Content contract

- Keep 12 lectures and 12 Champion Labs, one of each per teaching week.
- Keep three assessments weighted 20%, 40%, and 40%; each later task must reuse and improve earlier evidence.
- Maintain people, policies, related-content edges, the generated course API, and at least one Astromotion deck.
- Record patch/version context for roster data. Prefer Riot's official static data; do not hotlink game art or depend on a live API for rendering.
- This is an educational prototype, not an official Riot product. Preserve the disclaimer and avoid Riot logos, screenshots, and character likenesses in original course artwork.

## Platform and implementation rules

- Preserve the Slop identity, Astro stack, four required content collections, integrations, and generated API.
- Use `withBase()` for hand-written internal URLs in Astro components so GitHub Pages sub-path deployment works.
- Keep meaningful interaction progressive and accessible: keyboard focus, native controls, labels, live status text, and a usable no-storage baseline.
- LocalStorage may remember a student's atlas statuses, but course content and core navigation must never depend on it.
- Layouts must remain readable at 1440×900 and 390×844 without horizontal page scrolling.

## Quality loop

Before a commit that claims a feature is complete:

1. run `astro check` and remove all errors, warnings, and actionable hints;
2. run the production build and fix broken refs, base-path links, deck structure, and accessibility findings;
3. run the course spec tests and `pnpm check:evidence` when process citations exist;
4. search tracked source for `STARTER_CONTENT`, placeholder copy, unchanged starter images, and accidental secrets;
5. review whether the change produced a clearer next action for a student.

Do not hide uncertainty to make the site look complete. Label provisional course pools and test queues, and make their revision path explicit.
