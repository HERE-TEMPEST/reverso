/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
const env = require('Config')

export const apiConfig = {
	backendUri: `${env.SERVER_PROTOCOL}://${env.SERVER_HOST}:${env.SERVER_PORT}`,
	backendUri2: 'http://192.168.175.208:8000/',
	protocol: env.SERVER_PROTOCOL,
	host: env.SERVER_HOST,
	port: env.SERVER_PORT
}
