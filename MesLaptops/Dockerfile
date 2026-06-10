# ── Stage 1: Build Angular app ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

# ── Stage 2: Serve with Nginx ───────────────────────────────────────────────
FROM nginx:alpine
# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy our custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built Angular dist — folder name matches angular.json project name
COPY --from=builder /app/dist/MesLaptops/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
