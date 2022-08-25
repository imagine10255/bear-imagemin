#!/usr/bin/env node

/**
 * node bin/cli lossySquash --sourceFile=../../example/static/source.png --saveFile=../../example/static/lossySquash/image_1024.png --resizeWith=100
 */

/* istanbul ignore if */
const ver = process.version.match(/v(\d+)\./);
if (ver !== null && Number(ver[1]) < 10) {
    console.error('bear-node-imagemin: Node v10 or greater is required. `bear-node-imagemin` did not run.')
} else {
    const logger = require('../dist/script/logger');
    const bearScript = require('../dist/index');
    bearScript()
        .catch((e) => {
            logger.error(e.message);
            process.exit(1);
        });
}


