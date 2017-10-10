const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
					use: ['css-loader', 'sass-loader'],
					fallback: 'style-loader',
					publicPath: './'
				});
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
	entry: {
		app: './src/app.js',
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: cssConfig,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					'file-loader?name=images/[name].[ext]'
				]
			},
			{
				test: /\.(woff2?|svg)$/,
				use: 'url-loader?limit=9999&name=fonts/[name].[ext]'
			},
			{
				test: /\.(ttf|eot)$/,
				use: 'file-loader?name=fonts/[name].[ext]'
			},
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		hot: true,
		stats: "errors-only",
		open: false
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Remann',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.html'
		}),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: !isProd,
			allChunks: true
		}),
		new webpack.DefinePlugin({
			PRODUCTION: JSON.stringify(isProd)
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.AggressiveMergingPlugin(),
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, 'src/index.html'))
		}),
		new OptimizeCssAssetPlugin()	
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ['node_modules']
	}
}