const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
    app: path.join(__dirname, 'Scripts/app/'),
    build: path.join(__dirname, 'Scripts/app/'),
    styles: path.join(__dirname, 'dist/')
};

const postcssConfig = {
    import: require('postcss-import')({
        path: paths.styles,
        //addDependencyTo: webpack
    }),
    fonts: require('postcss-font-magician'),
    urls: require('postcss-url')(),
    cssnext: require("postcss-cssnext")({ browsers: ["last 3 versions"] }),
    precss: require('precss'),
    nesting: require('postcss-nesting')(),
    browserReporter: require('postcss-browser-reporter')(),
    reporter: require('postcss-reporter')(),
    //processors: [
    //    require('postcss-url'),
    //    require('postcss-cssnext')
    //    //({
    //    //             browsers: ['ie >= 9', 'last 2 versions']
    //    //         })
    //]
};

const loaders = {
    jsx: {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
    },
    tsx: {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015,presets[]=react!ts-loader'
    },
    css:
    {
        test: /\.css$/,
        use: extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    //loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
                    loader: 'css-loader', options: {
                        modules: true,
                        importLoaders: true,
                        localIdentName: '[name]__[local]' //'[path][name]__[local]--[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader', options: {
                        plugins: () => [
                            postcssConfig.import,
                            postcssConfig.fonts,
                            postcssConfig.urls,
                            postcssConfig.precss,
                            postcssConfig.nesting,
                            postcssConfig.browserReporter,
                            postcssConfig.reporter,
                            postcssConfig.cssnext
                        ]
                    }
                },
            ]
        })
        //test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    },
    //ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
    //    {
    //    test: /\.css$/,
    //        loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    //},
    images:
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    }
                }
            }
        ]
    }

    //{
    //    test: /\.(jpe?g|png|gif|svg)$/i,
    //    loaders: [
    //        'url?limit=10000&name=[name].[ext]?[hash:7]',
    //        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
    //    ]
    //}
};

const handledExtensions = ['', '.js', '.json', '.jsx', '.ts', '.tsx'];

module.exports = {
    paths,
    postcssConfig,
    loaders,
    handledExtensions
};
