FROM nginx:1.15.2-alpine
WORKDIR /app
COPY ./build/* ./build/
RUN mkdir /app/build/static && mv /app/build/js/ /app/build/static/ && mv /app/build/css/ /app/build/static/
COPY ./nginx.conf .
EXPOSE 80

## alpine default global config is /etc/nginx/nginx.conf(same as ubuntu), but only include /etc/nginx/conf.d/*.conf;
# RUN ls -lthr /etc/nginx
RUN ln -sfn /app/nginx.conf /etc/nginx/conf.d/default.conf

## alpine does not have folder sites-enabled/default
# RUN ln -sfn /app/nginx.conf /etc/nginx/sites-enabled/default

## nginx cli as default command. -g daemon -> nginx stays in foreground so docker can track process properly, otherwise container stops immediately after starting

#ENTRYPOINT ["nginx","-g","daemon off;"]

# ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

## runs the process in deamon mode and thus your container exits cleanly because the service command exits
# CMD service nginx start

# ENV PORT 8000
# ADD . /var/www
# RUN cd /var/www ; npm install 
# RUN cp conf/mysite /etc/nginx/sites-available/ && \
# 	cd /etc/nginx/sites-enabled && \
# 	ln -s ../sites-available/mysite