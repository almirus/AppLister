const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');
if (process.env.NODE_ENV === 'production') {
    module.exports = merge(common, prod);
} else {
    module.exports = merge(common, dev);
}