const webpack = require('webpack');
const path = require('path');

var precss       = require('precss');
var autoprefixer = require('autoprefixer');

const paths = {
    app: path.join(__dirname, 'public/scripts'),
    build: path.join(__dirname, 'public/scripts/dist'),
    styles: path.join(__dirname, 'public/styles')
};

const config = {
    entry: paths.app + '/components/index.tsx',
    output: {
        path: paths.build,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.ts(x?)$/,
                loader: 'babel-loader!ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
            },
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less'],
                include: paths.styles
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'],
                include: paths.style
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    modulesDirectories: paths.app,
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
            }
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
};

module.exports = config;

// module.exports = {
//     config,
//     postcss: [
//         require('postcss-cssnext')({
//             browsers: ['ie >= 9', 'last 2 versions']
//         })
//     ]
// }