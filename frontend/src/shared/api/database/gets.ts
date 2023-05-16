import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const getAllWords = async (userId: any): Promise<any> => {
	const { data } = await apiInstance.get(uris.gets.database, {
		headers: {
			'User-Id': userId
		}
	})

	return data.db
}
