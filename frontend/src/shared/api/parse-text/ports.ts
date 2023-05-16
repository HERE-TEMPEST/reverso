import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const parseText = async (userId: any, { text }: { text: string }) => {
	const newText = text.split('\n').join(' ').split('\r').join(' ')

	const { data } = await apiInstance.post(`${uris.posts.parseText}/?user_id=${userId}`, { text: newText })

	return data.words
}
