/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
	mode: 'production',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('1.0 Production version')
		}),
		new CopyPlugin({
			patterns: [{ from: 'public' }]
		})
	]
}
