import * as getsRequests from './gets'

type DatabaseRequests = typeof getsRequests

export const database: DatabaseRequests = {
	...getsRequests
}
