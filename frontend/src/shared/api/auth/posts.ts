import { apiInstance } from '../api-instance'
import { uris } from '../apis'

export const login = async ({ login, password }: { login: string; password: string }): Promise<any> => {
	const { data } = await apiInstance.post(uris.posts.login, {
		login,
		password
	})

	console.log({ data })

	const { user_id: userId } = data

	return {
		userId
	}
}
