#!/usr/bin/env node

/* istanbul ignore if */
if (process.version.match(/v(\d+)\./)[1] < 10) {
    console.error('bear-node-losslessSquash: Node v10 or greater is required. `bear-node-losslessSquash` did not run.')
} else {
    const logger = require('../dist/script/logger');
    const bearScript = require('../dist/bear-node-imagemin');
    bearScript()
        .catch((e) => {
            logger.error(e.message);
            process.exit(1);
        });
}
