From docker.ops.colourlife.com:5000/cento7_nginx_node
COPY ./build /home/project/html
COPY . /home/project
##切换目录启动脚本
WORKDIR /home/project/devops/shell
