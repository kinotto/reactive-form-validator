const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const PORT = process.env.PORT || 3003;

module.exports = {
  'entry': './app/index.jsx',
  'output': {
    'publicPath': '/',
    'path': path.resolve(__dirname, 'build'),
    'filename': 'bundle.js'
  },
  'devtool': 'source-map',
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
    'port': PORT
  },
  'resolve': {
    'extensions': ['.js', '.jsx']
  },
  'plugins': [
    // set env variable to production to reduce bundle size, only for prod
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // minification -> reduce the bundle , only for prod
    new UglifyJSPlugin(),

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
