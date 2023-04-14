import * as postsRequests from './posts'

type TreeRequests = typeof postsRequests

export const tree: TreeRequests = {
	...postsRequests
}
