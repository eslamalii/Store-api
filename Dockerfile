FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY prisma ./prisma
RUN bun prisma generate

COPY tsconfig.json ./
COPY src ./src
RUN bun build src/server.ts --outdir dist

EXPOSE 3000
CMD ["bun", "src/server.ts"]