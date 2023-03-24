FROM imagine10255/node-imagemin:0.0.1 AS builder
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN awk '/},/ { p = 0 } { if (!p) { print $0 } } /"devDependencies":/ { p = 1 }' package.json > package.json.tmp && mv package.json.tmp package.json
RUN yarn install --prod --frozen-lockfile
COPY . .

RUN yarn build

# 替換在 linux compile 的 bin
RUN rm -rf ./node_modules/jpegtran-bin && \
    rm -rf ./node_modules/mozjpeg && \
    rm -rf ./node_modules/optipng-bin && \
    rm -rf ./node_modules/pngquant-bin && \
    rm -rf ./node_modules/sharp && \
    tar -zxvf ./pkg/linux-pkg.tar.gz -C ./node_modules

RUN mkdir ./copy-tmp && \
    mv node_modules ./copy-tmp && \
    mv dist ./copy-tmp && \
    mv package.json ./copy-tmp

# And then copy over node_modules, etc from that stage to the smaller base image
FROM imagine10255/node-imagemin:0.0.1
WORKDIR /opt/app/
COPY --from=builder /opt/app/copy-tmp .
RUN mkdir /tmp/bear_imagemin

EXPOSE 8080
CMD ["pm2-runtime", "dist/main.js", "-i", "max"]
