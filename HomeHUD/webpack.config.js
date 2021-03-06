const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const settings = require('./webpack.config.settings');
const vendor = require('./webpack.config.vendor');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        //target: 'node', // HAD TO PUT THIS HERE TO AVOID GETTING ERRORS FROM 'as' TYPE CASTING IN boot-client.tsx
        module: {
            rules: [
                //{ test: /\.tsx?$/, include: /ClientApp/, use: 'babel-loader' },
                //{ test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                settings.loaders.tsx,
                settings.loaders.modularCss,
                settings.loaders.css,
                settings.loaders.images
            ]
        },
        plugins: [
            new ExtractTextPlugin('site.css'),
            new CheckerPlugin()
        ]
            .concat(isDevBuild ? [
                // Plugins that apply in development builds only
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static'
                })
            ] : [])
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/boot-client.tsx' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        target: 'web',
        plugins: [
            new webpack.DllReferencePlugin({
                context: './',
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    });

    // Configuration for server-side (prerendering) bundle suitable for running in Node
    const serverBundleConfig = merge(sharedConfig, {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': './ClientApp/boot-server.tsx' },
        plugins: [
            new webpack.DllReferencePlugin({
                context: './',
                manifest: require('./ClientApp/dist/vendor-manifest.json'),
                sourceType: 'commonjs2',
                name: './vendor'
            })
        ],
        output: {
            libraryTarget: 'commonjs',
            path: path.join(__dirname, './ClientApp/dist')
        },
        target: 'node',
        devtool: 'inline-source-map'
    });

    return [clientBundleConfig, serverBundleConfig];
};
