FROM nginx:latest

#将本地nginx.conf配置覆盖nginx配置
COPY nginx.conf /etc/nginx/nginx.conf
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/daison-web/
#声名端口
EXPOSE 80

RUN echo 'web project build  success!!'