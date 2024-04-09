FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8087

CMD ["java", "-jar", "application.jar"]