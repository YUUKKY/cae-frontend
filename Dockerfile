FROM swr.ap-southeast-3.myhuaweicloud.com/op_svc_cse/node-x86_64:8-int-1.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制所有文件到工作目录
COPY . .

# 构建应用
RUN npm run dev

CMD ["bash", "run.sh"]
