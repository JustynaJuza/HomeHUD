const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const settings = require('./webpack.config.settings.js');

const config = [{
    name: 'client',
    entry: [settings.paths.app + 'client/expose.js'],
    output: {
        path: settings.paths.build,
        filename: 'client.bundle.js'
    },
    module: {
        loaders: [
            settings.loaders.tsx,
            settings.loaders.css,
            settings.loaders.images
        ],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    postcss: function (webpack) {
        return [
            settings.postcssConfig.import(webpack),
            settings.postcssConfig.fonts,
            settings.postcssConfig.precss
        ].concat(settings.postcssConfig.processors);
    },
    modulesDirectories: settings.paths.app,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js']
    },
    plugins: [
        // minify code
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            includeClientScripts: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin('styles.css')
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'jQuery',
        'signalr': 'signalr'
    }
},
{
    name: 'server',
    entry: [settings.paths.app + 'server/expose.js'],
    output: {
        path: settings.paths.build,
        filename: 'server.bundle.js'
    },
    module: {
        loaders: [
            settings.loaders.tsx,
            settings.loaders.css,
            settings.loaders.images
        ]
    },
    postcss: function (webpack) {
        return [
            settings.postcssConfig.import(webpack),
            settings.postcssConfig.fonts,
            settings.postcssConfig.precss,
        ].concat(settings.postcssConfig.processors);
    },
    plugins: [
        new webpack.DefinePlugin({
            includeClientScripts: false
        }),
        new ExtractTextPlugin('styles.css')
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'jquery': 'jQuery',
        'signalr': 'signalr'
    }
}
];

module.exports = config;
