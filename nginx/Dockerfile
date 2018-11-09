FROM nginx:latest
WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ../client .
RUN react-scripts build
EXPOSE 80