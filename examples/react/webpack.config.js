const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PORT = process.env.PORT || 3003;
//copy library to local __dirname
/*copyReactiveFormValidationLibrary = () => {
  fs.createReadStream(path.join(__dirname, '../../build', 'bundle.js'))
  .pipe(fs.createWriteStream('./build/reactive-form-validation.js'));
}

copyReactiveFormValidationLibrary();
*/
module.exports = {
  'entry': './app/index.jsx',
  'output': {
    'publicPath': '/',
    'path': path.resolve(__dirname, 'build'),
    'filename': 'bundle.js'
  },
  'devtool': 'eval-source-map',
  'module': {
    'rules': [
      {
        'test': /\.(js|jsx)$/,
        'enforce': 'pre',
        'exclude': /node_modules/,
        'loader': 'eslint-loader',
        'options': {
          'fix': true
        }
      },
      {
        'test': /\.(js|jsx)$/,
        'use': {
          'loader': 'babel-loader',
          'options': {
            'presets': ['react', 'env', 'flow']
          }
        },
        'exclude': /node_modules/
      },

      {
        'test': /\.scss$/,
        'use': ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          'use': [{
            'loader': 'css-loader' // translates CSS into CommonJS
          },
          {
            'loader': 'sass-loader' // compiles Sass to CSS
          }
          ],
          'fallback': 'style-loader' // used when css not extracted
        }))
      },
      /* {
          test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        },*/
      {
        'test': /\.(jpe?g|png|gif|svg)$/i,
        'loader': 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  'devServer': {
    'hot': true,
    'port': PORT,
    'contentBase': path.resolve(__dirname)
  },
  'resolve': {
    'extensions': ['.js', '.jsx']
  },
  'plugins': [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      'filename': 'styles.css',
      'allChunks': true
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ]
};
