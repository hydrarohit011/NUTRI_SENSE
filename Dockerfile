# Stage 1: Build the React frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve the backend with the built frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY server.js .
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Expose port and start server
EXPOSE 8080
ENV PORT=8080
CMD ["node", "server.js"]
