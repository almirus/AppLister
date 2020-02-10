const path = require('path');
module.exports = {
    output: {
        path: path.resolve(__dirname, '../src/main/webapp'),
        publicPath: '/', filename: 'main.bundle.js',
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
console.warn(process.env.NODE_ENV);
