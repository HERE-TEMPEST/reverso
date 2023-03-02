/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = (envVars) => {
	const { env } = envVars
	const envConfig = require(`./webpack.${env}.js`)
	const config = merge(commonConfig, envConfig)

	return config
}
