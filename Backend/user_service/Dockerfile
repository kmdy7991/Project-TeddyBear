FROM openjdk:17-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8086

CMD ["java", "-jar", "application.jar"]