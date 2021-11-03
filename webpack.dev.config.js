const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: ['node_modules/**', '**/*.html']
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                }]
            },
        ]
    },

    entry: {
        app: path.resolve(__dirname, 'src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.cshtml'
        })
    ]
})