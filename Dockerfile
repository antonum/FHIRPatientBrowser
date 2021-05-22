FROM node:12-alpine

WORKDIR /opt
COPY ./public-html/ .
RUN npm install && npm run build

FROM httpd

COPY --from=0 /opt/dist.js /opt/index.html /usr/local/apache2/htdocs/

