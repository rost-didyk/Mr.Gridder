'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {

    entry: "./src/app/app.js",

    output: {
        path: "./dist",
        filename: "mr.gridder.js"
    },

    devtool: "source-map",

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.html$/, exclude: /node_modules/, loader: "text-loader"}
        ]
    },

    resolve: {
        root: [
            path.resolve(__dirname, 'src/app')
        ]
    },

    plugins: []
};