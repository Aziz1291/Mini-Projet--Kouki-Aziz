# ── Stage 1: Build ─────────────────────────────────────────────────────────
FROM gradle:8.14-jdk21 AS builder
WORKDIR /app
COPY build.gradle settings.gradle ./
COPY gradle ./gradle
# Download dependencies first (layer caching)
RUN gradle dependencies --no-daemon || true
COPY src ./src
RUN gradle bootJar --no-daemon -x test

# ── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port 8081 (users-microservice)
EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
