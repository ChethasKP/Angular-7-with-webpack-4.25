var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    //devtool: 'source-map',
  
    plugins: [ 
      new webpack.LoaderOptionsPlugin({
      options: {
        htmlLoader: {
         minimize: false
        }
      }
    }),
      new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      //   mangle: {
      //     keep_fnames: true
      //   }
      // }),
      new ExtractTextPlugin('[name].[hash].css')
    ],
    optimization: {
      minimizer: [
        // we specify a custom UglifyJsPlugin here to get source maps in production
        new UglifyJsPlugin({
          uglifyOptions: {
            mangle: {
                  keep_fnames: true
                }
          },
          sourceMap: false
        })
      ]
    }
  };
  