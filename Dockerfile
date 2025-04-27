FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install

COPY prisma ./prisma
RUN bun prisma generate

COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000
CMD ["sh","-c","bun prisma db push && bun --watch src/server.ts"]