# Copilot Instructions for Blacket

## Overview
Blacket is a Blooket-inspired game with custom packs, blooks, trading, multiplayer, leaderboards, chat, friends, auction house, and Stripe integration. The codebase is a monorepo with distinct backend, frontend, common, core, types, and mail-templates packages. It uses Bun, NestJS, React, Vite, Prisma, Redis, and Postgres.

## Architecture
- **Backend** (`backend/`): NestJS app, Prisma ORM, Redis, Stripe, and Socket.IO. Entry: `src/main.ts`, modules in `src/*/`.
- **Frontend** (`frontend/`): React + Vite, SCSS modules, Zustand for state, routes in `src/views/`, stores in `src/stores/`.
- **Common/Core/Types/Mail-Templates**: Shared logic, types, assets, and email templates. Linked via Bun workspaces.
- **Discord Bot** (`discord-bot/`): Separate bot logic, uses Discord.js.

## Developer Workflows
- **Install dependencies**: `bun install` in each package.
- **Backend**:
  - Build: `bun run build` or `nest build`
  - Start (dev): `bun run start:dev` or `nest start --watch`
  - Start (prod): `bun run start:prod`
  - Prisma: `bun run prisma:gen` (generate), `bun run prisma:push` (sync DB)
  - Lint: `bun run lint`
- **Frontend**:
  - Dev server: `bun run dev`
  - Build: `bun run build`
  - Lint: `bun run lint`
- **Common/Core**: Run with `bun run index.ts` (see respective README)

## Conventions & Patterns
- **TypeScript everywhere**; strict linting via ESLint and Prettier.
- **SCSS modules** for styling React components.
- **Zustand** for state management in frontend (`src/stores/`).
- **Prisma** schemas in `core/prisma/`, generated types in `types/`.
- **Linked dependencies**: Use Bun's `link:` for local packages.
- **Socket.IO** for real-time features (chat, auctions, etc).
- **Routes**: Frontend routes in `src/views/`, backend API routes via NestJS controllers.
- **No support for self-hosting yet** (see README).

## Integration Points
- **Stripe**: Payment integration in backend and frontend.
- **Redis**: Used for caching and pub/sub in backend.
- **Discord**: Bot logic in `discord-bot/`.
- **Prisma**: DB models in `core/prisma/`, migrations via backend scripts.

## Examples
- **Frontend state**: See `src/stores/InsanePullStore/` for Zustand usage.
- **Backend module**: See `src/auth/` for NestJS module pattern.
- **Prisma schema**: See `core/prisma/schema.prisma`.

## Tips for AI Agents
- Always use Bun for scripts and dependency management.
- Respect workspace boundaries; use local links for shared code.
- Follow strict linting and formatting rules.
- Reference README files in each package for specific instructions.
- For new features, mimic existing module/component structure.

---
For questions or unclear conventions, ask for clarification or review the relevant README files.
