import { IDatabaseWord } from '../../../entities/database'
import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const saveDatabase = async (userId: any, { database }: { database: Array<IDatabaseWord> }): Promise<any> => {
	await apiInstance.post(uris.posts.saveDatabase, database, {
		headers: {
			'User-Id': userId
		}
	})

	return
}

export const addNewWord = async (userId: any, { word }: { word: IDatabaseWord }): Promise<any> => {
	console.log({ word })
	return apiInstance.post(uris.posts.saveDatabase, [word], {
		headers: {
			'User-Id': userId
		}
	})
}

export const deleteWord = async (userId: any, { word }: { word: string }): Promise<any> => {
	return apiInstance.delete(uris.delete.deleteWord, {
		params: {
			word
		},
		headers: {
			'User-Id': userId
		}
	})
}
