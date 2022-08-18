import lossySquash from './index';

// $ ts-node lib/lossySquash/test.ts
lossySquash({sourceFile: './example/source.webp', saveFile: './example/lossySquash/image.webp', quality: .8});
