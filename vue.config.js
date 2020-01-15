const path = require('path');
const cssFrameworkDir = 'tailwind';

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@cX': path.resolve('src/components/' + cssFrameworkDir)
            }
        }
    }
};

