const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const path = require('path')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.prod.json'
                    }
                }]
            },
        ]
    },

    entry: {
        index: path.resolve(__dirname, 'src/lib/index.ts')
    },
    output: {
        library: {
            type: 'window'
        },
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js'
    },

    plugins: [
        new ReplaceInFileWebpackPlugin([{
            dir: 'types',
            rules: [
                { search: /export /g, replace: '' },            // 拿掉 export
                { search: /import.*(\r)?\n/g, replace: ''}      // 拿掉 import
            ]
        }])
    ]
})