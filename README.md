# bear-node-imagemin

> squash + resize typescript package by [imagemin](https://github.com/imagemin/imagemin) + [sharp](https://github.com/lovell/sharp)

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)

- If you don't want to worry about the problems imagemin encounters in the runtime environment,
  You can use `Docker image`([bear-imagemin-server](https://github.com/imagine10255/bear-node-imagemin/tree/master/packages/bear-imagemin-server)) + `npm package` ([bear-imagemin-client](https://github.com/imagine10255/bear-node-imagemin/tree/master/packages/bear-imagemin-client)) directly
- If you want to use it directly in the project, just install `bear-node-imagemin` directly

## Install

```bash
yarn add -D bear-node-imagemin
```


## How to use
```typescript
import {lossySquash, losslessSquash} from 'bear-node-imagemin';

const isLossLess = false;
const sourceFile = './example/static/source.png';

const params = {
  quality: isLossLess ? undefined: quality,
  resize: {width: 200, height: 200, ignoreOverflowSize: true},
  extname: 'webp',
};

// file to buff
const bufferData = fs.readFileSync(sourceFile);
const newBuff = isLossLess ?
        await losslessSquash(bufferData, params): // is lossLess
        await lossySquash(bufferData, params); // is lossy

fs.writeFileSync('./example/static/lossySquash/image_1024.png', newBuff);
```

## Use Docker Server + Client
see `packages/bear-imagemin-server` and `packages/bear-imagemin-client`


## Use CLI
see `packages/bear-imagemin-cli`



## Document

- [use-imagemin-to-compress-images](https://web.dev/i18n/zh/use-imagemin-to-compress-images/)
- [Sharp](https://github.com/lovell/sharp)
- [imagemin](https://github.com/imagemin/imagemin)

## License

MIT © [imagine10255](https://github.com/imagine10255)
