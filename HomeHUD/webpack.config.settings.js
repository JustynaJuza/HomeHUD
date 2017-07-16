const path = require('path');
const extractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
    app: path.join(__dirname, 'Scripts/app/'),
    build: path.join(__dirname, 'Scripts/app/'),
    styles: path.join(__dirname, 'dist/')
};

const postcssFunctions = {
    longTextShadow:
        function (offset, length, color) {
            var formatSingleRow = function(index, color) {
                return index + 'px ' + index + 'px 0 ' + color;
            }

            var values = [];
            for (var i = parseInt(offset); i <= parseInt(length); i++){
                values.push(formatSingleRow(i, color));
            }

            return values.join(',')
        }
}

const loaders = {
    jsx: {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
    },
    tsx: {
        test: /\.ts(x?)$/,
        include: /ClientApp/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [['es2015', { modules: false }], 'react']
                }
            },
            {
                loader: 'awesome-typescript-loader',
                options: {
                    silent: true
                }
            }
        ]
    },
    css:
    {
        test: /\.css$/,
        use: extractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: true,
                        localIdentName: '[name]__[local]' //'[path][name]__[local]--[hash:base64:5]'
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('precss')(),
                            require('postcss-functions')({ functions: postcssFunctions }),
                            require('postcss-font-magician')(),
                            require('postcss-url')(),
                            require('postcss-cssnext')({ browsers: ['last 3 versions'] }),
                            // following plugins are for showing errors in console and html
                            require('postcss-browser-reporter')(),
                            require('postcss-reporter')()
                        ]
                    }
                }
            ]
        })
    },
    images:
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file-loader',
            //{
            //    loader: 'url-loader',
            //    options: {
            //        limit=10000,
            //        name='[name].[ext]?[hash:7]',}
            //},
            {
                loader: 'image-webpack-loader',
                query: {
                    progressive: true,
                    optimizationLevel: 7,
                    interlaced: false,
                    mozjpeg: {
                        quality: 65
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    svgo: {
                        plugins: [
                            {
                                removeViewBox: false
                            },
                            {
                                removeEmptyAttrs: false
                            }
                        ]
                    }
                }
            }
        ]
    }
};

const handledExtensions = ['', '.js', '.json', '.jsx', '.ts', '.tsx'];

module.exports = {
    paths,
    loaders,
    handledExtensions
};
