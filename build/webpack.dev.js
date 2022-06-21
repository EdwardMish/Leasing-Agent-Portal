const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const BASE_PATH = 'https://app.qa.centecomm.com';

const commonComponents = merge(common.commonComponents, {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'react-dom$': 'react-dom/profiling',
            'scheduler/tracing': 'scheduler/tracing-profiling',
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            BASE_PATH: JSON.stringify(BASE_PATH),
            ROOT: JSON.stringify('/'),
            API_ROOT: JSON.stringify('https://api.qa.centecomm.com'),
            WORKER_ROOT: JSON.stringify('/'),
            AUTH_TARGET: JSON.stringify('dev'),
        }),
        new HtmlWebpackPlugin({
            template: './build/templates/dev.html',
            title: 'DashComm Dev',
            publicPath: BASE_PATH,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../public/web.dev.config'),
                    to: resolve(__dirname, '../dist/web.config'),
                },
            ],
        }),
    ],
});

const workers = merge(common.workers, {
    mode: 'development',
    devtool: 'inline-source-map',
});

module.exports = [commonComponents, workers];
