import * as postsRequests from './posts'

type NotesExtractorRequests = typeof postsRequests

export const notesExtractor: NotesExtractorRequests = {
	...postsRequests
}
