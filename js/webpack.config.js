const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: ["whatwg-fetch", "@babel/polyfill", "./src/index.js"],
    output: {
        path: path.resolve(__dirname, '../src/main/webapp'),
        publicPath: '/', filename: 'main.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ]
    },
};
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({})])}