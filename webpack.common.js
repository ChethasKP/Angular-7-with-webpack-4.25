var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json', 'src') }
          }, 'angular2-template-loader', 'angular-router-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)?(\?v=[0–9]\.[0–9]\.[0–9])?$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
      },
      {
        test: /\.(css|scss|sass)$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader, to-string-loader'
      },
      {
        test: /\.(css|scss|sass)$/,
        exclude: helpers.root('src', 'app'),
        loader: ['to-string-loader'].concat(ExtractTextPlugin.extract('raw-loader', 'css?sourceMap')
        )
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'to-string-loader!css-loader'
      },
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),



    new CopyWebpackPlugin([
      // { from: 'public/scripts', to: 'public/scripts' },
      { from: 'public/images', to: 'public/images' }
    ]),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [],
      append: false
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      // cacheGroups: {
      //   commons: {
      //     name: 'polyfills',
      //   },
      //   commons: {
      //     name: 'vendor',
      //   },
      //   commons: {
      //     name: 'app',
      //   }
      // }
    }
  }
};