const { resolve } = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { styles } = require('@ckeditor/ckeditor5-dev-utils');

const commonComponents = {
    entry: {
        app: './src/Core/index.tsx',
    },
    output: {
        filename: '[name].js?t=' + new Date().getTime(),
        path: resolve(__dirname, '../dist'),
        chunkFilename: '[name]-chunk.js?t=' + new Date().getTime(),
    },
    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ['raw-loader'],
            },
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                },
            },
            {
                test: /\.css$/,
                exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/],
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    //{
                    //    loader: 'css-modules-typescript-loader'
                    //},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                    happyPackMode: true,
                },
            },
            {
                test: /\.(png|svg|jpg|gif|pdf)$/,
                exclude: [/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.(png|svg|jpg|gif|pdf)$/],
                type: 'asset/resource',
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true,
                            },
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
                                },
                                minify: true,
                            }),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // new ForkTsCheckerWebpackPlugin(
        //     {
        //        eslint: {
        //            files: './src/**/*.{ts,tsx,js,jsx}'
        //        }
        //     }
        // ),
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, '../public'),
                    to: resolve(__dirname, '../dist'),
                    filter: (resourcePath) => {
                        const webConfigCheck = resourcePath.match(/.*web\.(dev|qa|prod)\.config$/g);

                        if (webConfigCheck && webConfigCheck.length > 0) return false;

                        return true;
                    },
                },
            ],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        symlinks: false,
        fallback: {
            path: resolve('path-browserify'),
            url: false,
        },
        roots: [__dirname],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
};

const workers = {
    entry: {
        sw: './src/Workers/ServiceWorker.ts',
    },
    output: {
        filename: '[name].js?t=' + new Date().getTime(),
        path: resolve(__dirname, '../dist/scripts'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
                options: {
                    configFile: 'tsconfig.workers.json',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        roots: [__dirname],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
};

module.exports = {
    commonComponents,
    workers,
};
