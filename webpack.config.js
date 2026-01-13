const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { VueLoaderPlugin } = require('vue-loader');
const {VuetifyPlugin} = require("webpack-plugin-vuetify");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
    if (env !== 'development') {
        Object.defineProperty(WorkboxPlugin, 'alreadyCalled', {
            get() {
                return false
            },
            set() {}
        })
    }

    return ({
        mode: "development",
        entry: './src/index.ts',

        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/public', to: '' },
                ],
            }),
            new HtmlWebpackPlugin({
                title: 'Blockudoku',
                template: './src/index.html',
                favicon: './src/public/favicon.png'
            }),
            new Dotenv({
                systemvars: true
            }),
            new VueLoaderPlugin(),
            new VuetifyPlugin({ autoImport: true }),
            new WorkboxPlugin.GenerateSW({
                clientsClaim: true,
                skipWaiting: true,
                maximumFileSizeToCacheInBytes: 5000000
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    }
                },
                {
                    test: /\.less$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "less-loader",
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(scss)$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    silenceDeprecations: [
                                        'color-functions',
                                        'global-builtin',
                                        'import'
                                    ]
                                }
                            }
                        }
                    ]
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.vue'],
            alias: {
                vue: 'vue/dist/vue.esm-bundler.js'
            }
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devServer: {
            static: "./dist",
            server: 'http'
        }
    });
}