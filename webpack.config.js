const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		index: './src/index.js',
		'pr-tab': './src/pr-tab.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name]_bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'index.html',
			filename: 'index.html',
			chunks: ['index']
		}),
		new HtmlWebpackPlugin({
			template: 'pr-tab.html',
			filename: 'pr-tab.html',
			chunks: ['pr-tab']
		})
	],
	module: {
		rules: [
			{
				test: /\.md$/,
				use: 'raw-loader'
			}
		]
	}
};
