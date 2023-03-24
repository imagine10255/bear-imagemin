FROM imagine10255/node-imagemin:0.0.1 AS builder
WORKDIR /opt/app/
COPY package.json yarn.lock ./
RUN awk '/},/ { p = 0 } { if (!p) { print $0 } } /"devDependencies":/ { p = 1 }' package.json > package.json.tmp && mv package.json.tmp package.json
RUN yarn install --prod --frozen-lockfile
COPY . .

RUN yarn build
RUN mkdir ./copy-tmp && \
    mv node_modules ./copy-tmp && \
    mv dist ./copy-tmp


# And then copy over node_modules, etc from that stage to the smaller base image
FROM imagine10255/node-imagemin:0.0.1
WORKDIR /opt/app/
COPY --from=builder /opt/app/copy-tmp .
RUN mkdir /tmp/bear_imagemin

EXPOSE 8080
CMD ["node", "--max_old_space_size=2048", "dist/main.js"]
