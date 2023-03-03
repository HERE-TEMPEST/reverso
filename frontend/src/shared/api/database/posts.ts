import { IDatabaseWord } from '../../../entities/database'
import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const saveDatabase = async ({ database }: { database: Array<IDatabaseWord> }): Promise<any> => {
	await apiInstance.post(uris.posts.saveDatabase, database)

	return
}
