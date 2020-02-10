const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
    mode: 'production',
    entry: ["whatwg-fetch", "@babel/polyfill", "./src/index.js"],
});