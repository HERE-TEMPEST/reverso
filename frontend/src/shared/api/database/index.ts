import * as getsRequests from './gets'

type DatabaseRequests = typeof getsRequests

export const Databases: DatabaseRequests = {
	...getsRequests
}
