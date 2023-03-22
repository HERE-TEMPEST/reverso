import { IDatabaseWord } from '../../../entities/database'
import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const saveDatabase = async ({ database }: { database: Array<IDatabaseWord> }): Promise<any> => {
	await apiInstance.post(uris.posts.saveDatabase, database)

	return
}

export const addNewWord = async ({ word }: { word: IDatabaseWord }): Promise<any> => {
	console.log({ word })
	return apiInstance.post(uris.posts.saveDatabase, [word])
}

export const deleteWord = async ({ word }: { word: string }): Promise<any> => {
	return apiInstance.delete(uris.delete.deleteWord, {
		params: {
			word
		}
	})
}
