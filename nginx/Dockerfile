FROM nginx:latest
# FROM nginx:1.15.2-alpine
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/nginx.template
# copy /build folder to /var/www
COPY ./build /var/www   
EXPOSE 80

#  -g daemon off; so that nginx stays in the foreground so that Docker can track the process properly (otherwise your container will stop immediately after starting)
ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
RUN sudo service nginx start

# ENV PORT 8000
# ADD . /var/www
# RUN cd /var/www ; npm install 
# RUN cp conf/mysite /etc/nginx/sites-available/ && \
# 	cd /etc/nginx/sites-enabled && \
# 	ln -s ../sites-available/mysite