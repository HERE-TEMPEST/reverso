import * as getsRequests from './gets'
import * as postsRequests from './posts'

type LanguageDetectorRequests = typeof getsRequests & typeof postsRequests

export const languageDetector: LanguageDetectorRequests = {
	...getsRequests,
	...postsRequests
}
