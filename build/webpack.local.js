const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common');

const BASE_PATH = 'http://localhost:3000';

const commonComponents = (env) => merge(common.commonComponents, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
          static: resolve(__dirname, '../dist'),
          compress: true,
          port: 3000,

          client: {
            logging: 'info',
            overlay: {
                errors: true,
                warnings: true,
            },
            progress: true,
            },
        
            historyApiFallback: true,
            hot: true,
            open: true,        
    },
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
            API_ROOT: `${env.localapi ? JSON.stringify('http://localhost') : JSON.stringify('https://api.qa.centecomm.com')}`,
            WORKER_ROOT: JSON.stringify('/'),
            AUTH_TARGET: JSON.stringify('local'),
        }),
        new HtmlWebpackPlugin({
            template: './build/templates/dev.html',
            title: 'DashComm Local',
            publicPath: BASE_PATH,
        }),
    ],
});

const workers = merge(common.workers, {
    mode: 'development',
    devtool: 'inline-source-map',
});

module.exports = [commonComponents, workers];
