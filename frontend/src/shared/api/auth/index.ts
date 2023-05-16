import * as postsRequests from './posts'

type AuthRequests = typeof postsRequests

export const auth: AuthRequests = {
	...postsRequests
}
