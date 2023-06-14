FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf

COPY /dist/p0-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 8080
# CMD nginx


