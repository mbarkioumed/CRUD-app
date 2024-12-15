# Step 1: Build the Spring Boot application using Maven
FROM maven as build

# Set working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src/

RUN mvn clean install -DskipTests

FROM openjdk:25-jdk-slim

WORKDIR /app

RUN groupadd -r appuser && useradd -r -g appuser appuser

COPY --from=build /app/target/*.jar app.jar

RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
