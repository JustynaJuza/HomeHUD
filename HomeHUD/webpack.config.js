const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
    app: path.join(__dirname, 'Scripts/app/'),
    build: path.join(__dirname, 'Scripts/app/'),
    styles: path.join(__dirname, 'Content')
};

const postcssConfig = {
    import: function (webpack) {
        return require('postcss-import')({
            path: paths.styles,
            addDependencyTo: webpack
        })
    },
    fonts: require('postcss-font-magician'),
    precss: require('precss'), //({
    // variables: [require(paths.styles + '/variables.js')].concat({'$color_accent_1': '#93ff33'})
    //}),
    processors: [
        require('postcss-url'),
        require('postcss-cssnext')
        //({
        //             browsers: ['ie >= 9', 'last 2 versions']
        //         })
    ]
};

const config = [{
    name: 'client',
    entry: [paths.app + 'client/expose.js'],
    output: {
        path: paths.build,
        filename: 'client.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.ts(x?)$/,
            loader: 'babel-loader!ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less'],
            include: paths.styles
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: paths.style
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'url?limit=10000&name=[name].[ext]?[hash:7]',
              'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }
        ],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    postcss: function (webpack) {
        return [
            postcssConfig.import(webpack),
            postcssConfig.fonts,
            postcssConfig.precss,
        ].concat(postcssConfig.processors);
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
        }),
        new ExtractTextPlugin('styles.css')
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
},
{
    name: 'server',
    entry: [paths.app + 'server/expose.js'],
    //target: "node",
    output: {
        path: paths.build,
        filename: 'server.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.ts(x?)$/,
            loader: 'babel-loader!ts-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
        }, {
            test: /\.less$/,
            loaders: ['style', 'css', 'less'],
            include: paths.styles
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: paths.style
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
              'url?limit=10000&name=[name].[ext]?[hash:7]',
              'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }
        ]
    },
        postcss: function (webpack) {
            return [
                postcssConfig.import(webpack),
                postcssConfig.fonts,
                postcssConfig.precss,
            ].concat(postcssConfig.processors);
        },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}
];

module.exports = config;
