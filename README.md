# bear-node-imagemin

> squash + resize typescript package by [imagemin](https://github.com/imagemin/imagemin) + [sharp](https://github.com/lovell/sharp)

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)

- If you don't want to worry about how nodejs is installed in docker,
  You can use `Docker image`([bear-imagemin-api](https://github.com/imagine10255/bear-node-imagemin/tree/master/packages/bear-imagemin-api)) + `npm package` ([bear-imagemin-client](https://github.com/imagine10255/bear-node-imagemin/tree/master/packages/bear-imagemin-client)) directly
- If you want to use it directly in the project, just install `bear-node-imagemin` directly

## Install

```bash
yarn add -D bear-node-imagemin
```


## Use
```typescript
import {lossySquash, losslessSquash} from 'bear-node-imagemin';

const isLossLess = false;
const sourceFile = './example/source.png';

const params = {
  quality: isLossLess ? undefined: quality,
  resize: {width: 200, height: 200, ignoreOverflowSize: true},
  extname: '.webp',
};

// file to buff
const bufferData = fs.readFileSync(sourceFile);
const newBuff = isLossLess ?
        await losslessSquash(buff, params): // is lossLess
        await lossySquash(buff, params); // is lossy

fs.writeFileSync('./example/lossySquash/image_1024.png', newBuff);
```


## Cli
in your package.json
```json
{
  "scripts": {
    "image:lossySquash": "bear-node-imagemin lossySquash --sourceFile=./example/source.png --saveFile=./example/lossySquash/image_1024.png --with=width"
  }
}

# then run `yarn image:lossySquash`
```

## Document

- [use-imagemin-to-compress-images](https://web.dev/i18n/zh/use-imagemin-to-compress-images/)
- [Sharp](https://github.com/lovell/sharp)
- [imagemin](https://github.com/imagemin/imagemin)

## License

MIT © [imagine10255](https://github.com/imagine10255)
