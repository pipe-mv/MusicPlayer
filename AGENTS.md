# MusicPlayer Agent Guide

This file defines how coding agents should work in this repository. Read
`ARCHITECTURE.md` before changing application code and use `README.md` for setup,
features, and deployment context.

## Workflow rules

- Make application changes only on `codex-work`.
- Use `github-actions` only for workflow-specific changes.
- Never create another branch.
- Before starting application work, fetch `origin` and fast-forward
  `codex-work` to `origin/main`.
- Preserve unrelated or user-authored working-tree changes.
- Do not stage, commit, or push until the user explicitly approves.
- Use the same text for the commit message and pull-request title.
- Provide every pull-request description in a copyable Markdown code block.
- Pull requests target `main`; merging and production deployment are handled by
  the user and GitHub Actions.

## Protected and generated files

- Keep `.env` and `.env.*` ignored, except for the tracked `.env.example`.
- Keep `src/assets/client_secret*.json` ignored and never delete matching local
  files.
- Never commit `node_modules`, generated `build` output, secrets, or API keys.
- The application reads the YouTube browser key from
  `REACT_APP_YOUTUBE_API_KEY`.

## Architecture

The source is feature-oriented. Follow the dependency direction and placement
rules in `ARCHITECTURE.md`.

- `src/modules/*/domain`: framework-independent feature data and types.
- `src/modules/*/application`: hooks that own state and coordinate behavior.
- `src/modules/*/infrastructure`: APIs, storage, and other external boundaries.
- `src/modules/*/ui`: feature screens and presentation components.
- `src/shared`: code genuinely reused by multiple features.
- `src/app/App.tsx`: composition root for routes and feature wiring.
- `src/layout`: application-wide layout components.

Keep API URLs and storage keys in infrastructure modules. UI components should
communicate intent through callbacks rather than calling APIs or `localStorage`
directly. Prefer local state and hooks; do not introduce a global state library
without a demonstrated need.

## Implementation style

- Keep components small and presentation-focused.
- Use TypeScript domain interfaces and plain infrastructure functions.
- Add code to an existing feature before considering `shared`.
- Create only the layers a feature actually needs.
- Prefer accessible names, keyboard behavior, and touch-friendly controls.
- Use short comments only to explain purpose, intent, boundaries, or surprising
  behavior. Do not narrate obvious code.
- Preserve the existing British spelling of “favourite” in user-facing copy.

## Verification

Run all required checks before preparing a pull request:

```bash
npm run typecheck
npm test -- --watchAll=false
npm run build
```

Add or update tests at the appropriate boundary. Keep at least one
application-level test covering the main search form. Do not commit the generated
`build` directory.

For responsive or interaction changes, verify both direct page load and viewport
resizing where relevant. Use the live site through the Browser when production
visual verification is needed:

```text
https://pipe-mv.github.io/MusicPlayer/
```

## Pull-request handoff

Before asking for approval to commit or preparing a pull request, report:

- changed files and user-visible behavior;
- TypeScript, test, and production-build results;
- any browser or responsive checks performed;
- confirmation that protected and generated files were not staged.
