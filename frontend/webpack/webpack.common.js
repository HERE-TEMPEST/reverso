/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const path = require('path')
// const tsconfig = require('../tsconfig.json')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const miniCss = require('mini-css-extract-plugin')

module.exports = {
	entry: path.resolve(__dirname, '..', './src/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
		// alias: Object.keys(tsconfig.compilerOptions.paths).reduce((aliases, aliasName) => {
		// 	aliases[aliasName] = path.resolve(__dirname, '..', `src/${tsconfig.compilerOptions.paths[aliasName][0]}`)

		// 	return aliases
		// }, {})
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.(s*)css$/,
				use: [miniCss.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline'
			}
		]
	},
	output: {
		path: path.resolve(__dirname, '..', './build'),
		filename: 'bundle.js'
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: path.resolve(__dirname, '..', './src/index.html')
		}),
		new CopyPlugin({
			patterns: [{ from: 'source', to: 'dest', noErrorOnMissing: true }]
		}),
		new miniCss({
			filename: 'styles.css',
			ignoreOrder: false
		})
	]
}
