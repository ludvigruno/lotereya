let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf ={
    entry: './src/index.js',
    output:{
        filename: 'main.js',
        path: path.resolve(__dirname,'./dist'),
        publicPath: 'dist/'
    },
    devServer:{
      overlay: true
    },
    module:{
        rules:[
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /(node_modules)/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                     fallback: "style-loader",
                     use: "css-loader"
                   })
            },
            {
                test: /\.(gif|jpg|png|mp3|aac|ogg)$/,
                loader: 'file'
           }
        ]
    },
    plugins: [
     new ExtractTextPlugin("styles.css"),
    ]
};

module.exports = (env, options) => {
	let production = options.mode === 'production';
	conf.devtool = production ? false:'cheap-module-eval-source-map';
	return conf;
}