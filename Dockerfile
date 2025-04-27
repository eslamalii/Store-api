FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY prisma ./prisma
COPY tsconfig.json ./
COPY src ./src

RUN bun prisma generate

RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]