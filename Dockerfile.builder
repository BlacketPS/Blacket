ARG BUN_VERSION=latest
ARG NODE_VERSION=current
FROM imbios/bun-node:${BUN_VERSION}-${NODE_VERSION}-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY backend/ ./backend/
COPY frontend/ ./frontend/
COPY discord-bot/ ./discord-bot/
COPY packages/common/ ./packages/common/
COPY packages/core/ ./packages/core/
COPY packages/types/ ./packages/types/
COPY packages/mail-templates/ ./packages/mail-templates/

RUN apt-get update && apt-get install -y python3 build-essential

ENV SERVER_DATABASE_URL="postgresql://blacket:blacketpassword@blacket_postgres:5432/blacketdb?schema=public"
ENV SKIP_PRISMA_MIGRATE=1

RUN bun install