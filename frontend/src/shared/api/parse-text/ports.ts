import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const parseText = async ({ text }: { text: string }) => {
	const { data } = await apiInstance.post(uris.posts.parseText, { text })

	return data.words
}
