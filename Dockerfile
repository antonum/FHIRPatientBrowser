FROM neumantm/httpd-npm:2.4.34-v8.11.3
#RUN apt update
#RUN apt install -y nodejs


#WORKDIR /usr/local/apache2/htdocs/
#COPY dist.js .
#COPY main.js .
#COPY index.html .
COPY ./public-html/ /usr/local/apache2/htdocs/
RUN npm install
RUN npm build
#RUN npx webpack --config --force webpack.config.js



# CMD ["/usr/sbin/apache2","-D","FOREGROUND"]