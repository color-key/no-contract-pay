FROM openjdk:8-jdk-alpine
VOLUME /tmp
VOLUME /Users/fay/Documents
ADD app.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

