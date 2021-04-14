/**
 * Created by Administrator on 0013 2016-08-13.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './components/app-device.jsx',
    output: {
        path: path.join(__dirname, 'public/bundle'),
        filename: 'app-device-bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.js|jsx$/, loader: "babel?presets[]=react,presets[]=es2015", exclude: /node_modules/}
        ]
    }


}