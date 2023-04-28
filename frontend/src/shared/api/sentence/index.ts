import * as postsRequests from './posts'

type SentenseRequests = typeof postsRequests

export const sentense: SentenseRequests = {
	...postsRequests
}
