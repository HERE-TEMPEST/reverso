import * as getsRequests from './gets'
import * as postsRequests from './posts'

type DatabaseRequests = typeof getsRequests & typeof postsRequests

export const database: DatabaseRequests = {
	...getsRequests,
	...postsRequests
}
