FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8085rm

CMD ["java", "-jar", "application.jar"]