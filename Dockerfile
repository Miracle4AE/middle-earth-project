# Multi-stage build
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies only when needed
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy all files and build
COPY . .

ENV NODE_ENV=production

RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=0 /app/public ./public
COPY --from=0 /app/.next/standalone ./
COPY --from=0 /app/.next/static ./.next/static

USER nextjs

CMD ["node", ".next/standalone/server.js"] 