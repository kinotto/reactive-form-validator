const path = require('path');
//const webpackRxjsExternals = require('webpack-rxjs-externals');
//const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/reactive-form-validator.ts',
    devtool: 'source-map',
    //target: 'node',
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
                /*exclude: [
                    /(node_modules|bower_components|unitTest)/,
                    './webpack.config.js'
                ]*/
            }
        ]
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      }


     // externals: [nodeExternals()]
    //node: {fs: "empty"}
    //externals: [nodeExternals(), webpackRxjsExternals()]
    //externals: [webpackRxjsExternals()]
}