import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const parseText = async ({ text }: { text: string }) => {
	const newText = text.split('\n').join(' ').split('\r').join(' ')

	const { data } = await apiInstance.post(uris.posts.parseText, { text: newText })

	return data.wordsw
}
