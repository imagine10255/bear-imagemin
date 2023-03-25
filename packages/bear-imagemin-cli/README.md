# bear-imagemin-cli

> bear-node-imagemin cli by docker service

[![NPM](https://img.shields.io/npm/v/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)
[![npm](https://img.shields.io/npm/dm/bear-node-imagemin.svg)](https://www.npmjs.com/package/bear-node-imagemin)


## Build Docker file

```bash
yarn add -D bear-imagemin-cli
```

Client is docker service
in your package.json
```json
{
  "scripts": {
    "image:lossySquash": "bear-imagemin-cli lossySquash --sourceFile=./example/source.png --saveFile=./example/lossySquash/image_1024.png --resizeWith=240"
  }
}

# then run `yarn image:lossySquash`
```

PS: `$version` change current number (ex: 1.0.8)


## Test
```bash
node ./dist/bin/cli.js losslessSquash -s /Users/imagine/project/packages/bear-node-imagemin/packages/bear-imagemin-cli2/static/fixture.jpg -t /Users/imagine/project/packages/bear-node-imagemin/packages/bear-imagemin-cli2/static/output_losslessSquash.png -w 240
node ./dist/bin/cli.js lossySquash -s /Users/imagine/project/packages/bear-node-imagemin/packages/bear-imagemin-cli2/static/fixture.jpg -t /Users/imagine/project/packages/bear-node-imagemin/packages/bear-imagemin-cli2/static/output_losslessSquash.png -w 240 -q 90
```

## API Params

post body

body name    | type               | required | default | 
-------------|--------------------|----------|---------|
sourceFile   | Buffer             | ✓        |
resizeWidth   | number             |
resizeHeight   | number       |
quality   | number             |
ignoreOverflowSize   | boolean     |          | true     
extname   | .jpg, .png, .webp' |          | .webp   |


## License

MIT © [imagine10255](https://github.com/imagine10255)
