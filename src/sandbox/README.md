# Playground

Small in-app playground for quickly composing components.

- Index: `/playground`
- Example: `/playground/[slug]`

## How to add a new example

- Create `src/playground/examples/<slug>-demo.tsx` exporting a default React component.
- Register it in `src/playground/examples/index.tsx` with a unique `slug`.
- Visit `/playground/<slug>` to view it.

This stays separate from Storybook and npm build; it only uses `src/` components.






