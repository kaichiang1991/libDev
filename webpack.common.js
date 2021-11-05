const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': __dirname,
            'Assets': path.resolve(__dirname, 'assets')
        },
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            // 原名稱複製到output路徑下
            {
                test: /\.(png|jpg|atlas|json|mp3)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]'
                }
            }
        ]
    },

    externals: {
        'pixi.js-legacy': 'PIXI'
    }
}