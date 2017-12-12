const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/reactive-form-validator.ts',
    devtool: 'source-map',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        libraryTarget: 'umd',
        library: 'test'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/
            }
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        //minification
        new UglifyJSPlugin()
    ]
}