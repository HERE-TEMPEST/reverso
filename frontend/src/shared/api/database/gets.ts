import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const getAllWords = async (userId: any): Promise<any> => {
	const { data } = await apiInstance.get(`${uris.gets.database}/?user_id=${userId}`)

	return data.db.db
}
