const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const autoprefixer = require('autoprefixer')

const isDev = process.env.Node_ENV === 'development'
const isProd = !isDev

const fileName = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    mode: 'development',

    entry: ['@babel/polyfill', './src/index.ts'],

    devtool: isProd ? false : 'inline-source-map',

    output: {
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: `assets/${fileName('[ext]')}`
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            filename: 'index.html',
        }),

        new CleanWebpackPlugin(),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public/assets/img'),
                    to:   path.resolve(__dirname, 'dist/assets')
                },
            ]
        })
        
        
    ],

    target: 'web',
    devServer: {
        port: '3000',
        open: true,
        liveReload: true,
    }, 

    module: {
        rules: [
            {
                test: /.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                }
            },

            {
                test: /\.css$/i,
                use: [
                        'style-loader',
                        'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer({
                                        overrideBrowserslist:['ie >= 8', 'last 4 version']
                                    })
                                ],
                            }
                        }
                    }
                ]
            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
          ],
    },
    resolve: {
        extensions: ['.tsx', 'jsx', '.ts', '.js', 'css']
    },
}
