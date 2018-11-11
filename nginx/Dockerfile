FROM nginx:latest
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/nginx.template
COPY ../client .
RUN react-scripts build
RUN mv /build /var/www

EXPOSE 80

ENTRYPOINT /bin/bash -c "envsubst < /etc/nginx/conf.d/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
RUN service nginx start

# ENV PORT 8000
# ADD . /var/www
# RUN cd /var/www ; npm install 
# RUN cp conf/mysite /etc/nginx/sites-available/ && \
# 	cd /etc/nginx/sites-enabled && \
# 	ln -s ../sites-available/mysite