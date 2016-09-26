const webpack = require('webpack');
const path = require('path');

const paths = {
    app: path.join(__dirname, 'Scripts/app/'),
    build: path.join(__dirname, 'Scripts/app/'),
    styles: path.join(__dirname, 'Content')
};

const postcssConfig = {
    import: function(webpack) {
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
    entry: [paths.app + 'components/app.tsx'],
    output: {
        path: paths.build,
        filename: 'bundle.js'
        //publicPath: 'Scripts/dist/'
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
            loader: "style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader"
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
        // {
        //   test: /\.png$/,
        //   loader: "url-loader?limit=100000"
        // },
        // {
        //   test: /\.jpg$/,
        //   loader: "file-loader"
        // }
      ],
        preLoaders: [{
            test: /\.js$/,
            loader: 'source-map-loader'
        }]
    },
    postcss: function(webpack) {
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
        })
    ],
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}
//{
//  name: 'server',
//        entry: "./signalR/index.ts",
//        target: "node",
//        output: {
//        filename: 'server.bundle.js'
//        },
//        //externals: /^[a-z\-0-9]+$/,
//        module: {
//            loaders:
//      [{
//          test: /\.ts(x?)$/,
//          loader: 'babel-loader!ts-loader',
//          exclude: /node_modules/
//      }]
//        },
//    resolve: {
//        extensions: ['', '.js', '.json', '.jsx', '.ts', '.tsx', '.webpack.js', '.web.js']
//    }
//}
];

module.exports = config;
