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
    precss: require('precss'),
    processors: [
        require('postcss-url'),
        require('postcss-cssnext')
        //({
        //             browsers: ['ie >= 9', 'last 2 versions']
        //         })
    ]
};

const loaders = {
    jsx: {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
    },
    tsx: {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015,presets[]=react!ts-loader'
    },
    css: {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
    },
    images: {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'url?limit=10000&name=[name].[ext]?[hash:7]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
    }
};

const handledExtensions = ['', '.js', '.json', '.jsx', '.ts', '.tsx'];

module.exports = {
    paths,
    postcssConfig,
    loaders,
    handledExtensions
};
