import * as postsRequests from './ports'

type ParseTextRequests = typeof postsRequests

export const parseText: ParseTextRequests = {
	...postsRequests
}
