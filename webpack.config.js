var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/reactive-form-validator.ts',
    devtool: 'inline-source-map',
    target: 'web',
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        libraryTarget: 'umd'
        //library: 'test'
    },
    resolve: {
        extensions: ['.ts'] //resolve all the modules other than index.ts
    },
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts?$/
            }
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
    externals: [nodeExternals()]
}