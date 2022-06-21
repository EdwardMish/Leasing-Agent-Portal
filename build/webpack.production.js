const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const { resolve } = require('path');

const BASE_PATH = 'https://www.dashcomm.com';

const commonComponents = merge(common.commonComponents, {
    mode: 'production',
    recordsPath: resolve(__dirname, 'build-logs/records.common-components.json'),
    recordsInputPath: resolve(__dirname, 'build-logs/records.common-components.json'),
    recordsOutputPath: resolve(__dirname, 'build-logs/records.common-components.json'),
    plugins: [
        new webpack.DefinePlugin({
            BASE_PATH: JSON.stringify(BASE_PATH),
            ROOT: JSON.stringify('/'),
            API_ROOT: JSON.stringify('https://api.centecomm.com'),
            WORKER_ROOT: JSON.stringify('/'),
            AUTH_TARGET: JSON.stringify('prod'),
        }),
        new HtmlWebpackPlugin({
            template: './build/templates/prod.html',
            title: 'DashComm',
            publicPath: BASE_PATH,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../public/web.prod.config'),
                    to: resolve(__dirname, '../dist/web.config'),
                },
            ],
        }),
    ],
});

const workers = merge(common.workers, {
    mode: 'production',
    recordsPath: resolve(__dirname, 'build-logs/records.workers.json'),
    recordsInputPath: resolve(__dirname, 'build-logs/records.workers.json'),
    recordsOutputPath: resolve(__dirname, 'build-logs/records.workers.json'),
});

module.exports = [commonComponents, workers];
