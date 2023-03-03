import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const getAllWords = async (): Promise<any> => {
	const { data } = await apiInstance.get(uris.gets.database)

	return data.db
}
