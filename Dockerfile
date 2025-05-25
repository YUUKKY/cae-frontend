FROM swr.ap-southeast-3.myhuaweicloud.com/op_svc_cse/node-x86_64:8-int-1.0

# 设置工作目录
WORKDIR /app

# 复制所有文件到工作目录
COPY . .

EXPOSE 8080

CMD ["bash", "run.sh"]
