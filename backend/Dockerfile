# Step 1: Build the application using Maven
FROM maven:3.8.4-openjdk-17 AS build

WORKDIR /app
# Copy the source code into the container
COPY . .  
# Run Maven to build the project and skip tests

RUN mvn clean package -DskipTests  
# Step 2: Create the final image using OpenJDK
FROM openjdk:17

WORKDIR /app
# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar  

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]