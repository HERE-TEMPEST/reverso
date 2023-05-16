/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable camelcase */
import { IDatabaseWord } from '../../../entities/database'
import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const saveDatabase = async (userId: any, { database }: { database: Array<IDatabaseWord> }): Promise<any> => {
	await apiInstance.post(`${uris.posts.saveDatabase}/?user_id=${userId}`, database)

	return
}

export const addNewWord = async (userId: any, { word }: { word: IDatabaseWord }): Promise<any> => {
	console.log({ word })
	return apiInstance.post(`${uris.posts.saveDatabase}/?user_id=${userId}`, [word])
}

export const deleteWord = async (userId: any, { word }: { word: string }): Promise<any> => {
	return apiInstance.delete(uris.delete.deleteWord, {
		params: {
			word,
			user_id: userId
		}
	})
}
