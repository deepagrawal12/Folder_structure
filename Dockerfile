FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY dist/obe-simactivationui/ .
COPY ./src/simactivation/assets/headerfooter/ ./headerfooter/
