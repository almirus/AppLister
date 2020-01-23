module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                node: 'current',
                ie: '11',
            },
        }],
    ],
};