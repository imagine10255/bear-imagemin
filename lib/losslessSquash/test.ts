import losslessSquash from './index';

// $ ts-node lib/losslessSquash/test.ts
losslessSquash({sourceFile: './example/source.png', saveFile: './example/losslessSquash/先縮圖後壓縮image.png', width: 1024});
