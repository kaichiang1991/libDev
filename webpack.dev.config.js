const common = require('./webpack.common')
const {merge} = require('webpack-merge')
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const libPaths = require('./buildTool/libPaths')
const externalPaths = require('./buildTool/externalsPaths')

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
        new CopyPlugin({
            patterns: [
                {from: 'lib/**', toType: 'dir', noErrorOnMissing: true}
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'template.cshtml',
            files: {
                js: externalPaths               // 外部lib的cdn連結
                .concat(
                    !libPaths.length? []: libPaths.map(_path => path.join('lib', _path, 'index.min.js'))    // 自己開發的lib
                )
            }
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'types/**')
            ]
        })
    ]
})