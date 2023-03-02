/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
	mode: 'test',
	devtool: 'source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.name': JSON.stringify('1.0 Production version')
		}),
		new BundleAnalyzerPlugin()
	]
}
