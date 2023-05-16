import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const login = async ({ login, password }: { login: string; password: string }): Promise<any> => {
	const { data } = await apiInstance.post(uris.delete.deleteWord, {
		login,
		password
	})

	const { userId } = data

	return {
		userId
	}
}
