const path = require('path')
const webpack = require('webpack')

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

    plugins: [
        new webpack.DefinePlugin({
            'PACKAGE_NAME': JSON.stringify(process.env.npm_package_name),
            'PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version)
        })
    ],

    externals: {
        'pixi.js-legacy': 'PIXI'
    }
}