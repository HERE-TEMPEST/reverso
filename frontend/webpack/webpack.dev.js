/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	devServer: {
		historyApiFallback: true,
		port: 3001,
		open: true
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('1.0 Development Version')
		}),
		new ReactRefreshWebpackPlugin()
	]
}
