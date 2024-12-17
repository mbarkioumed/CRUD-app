# Step 1: Build the Spring Boot application using Maven
FROM maven as build

# Set working directory
WORKDIR /app

# Copy the pom.xml and install dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src/

RUN mvn clean install -DskipTests

FROM eclipse-temurin:17-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
