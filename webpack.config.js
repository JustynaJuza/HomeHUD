const webpack = require('webpack');
const path = require('path');

const paths = {
    app: path.join(__dirname, 'public/scripts'),
    build: path.join(__dirname, 'public/scripts/min')
};

const TARGET = process.env.npm_lifecycle_event;

const config = {
    entry: paths.app + '/app.jsx',
    output: {
        path: paths.build,
        filename: '[name].js'
    },
    // add 'babel-loader' jsx transforms (requires babel-loader babel-core babel-preset-es2015 babel-preset-react)
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel?cacheDirectory',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    },
    modulesDirectories: paths.app,
    // look for files with extensions to just require('file')
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    },
    plugins: [
        // minify code
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
                BABEL_ENV: TARGET
            }
        })
    ]
};

module.exports = config;
