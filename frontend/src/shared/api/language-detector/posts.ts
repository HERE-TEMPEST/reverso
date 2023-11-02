import { apiInstance } from '../api-instance'

export const detect = async ({ file }: { file: File }): Promise<any> => {
	const formData = new FormData()

	formData.append('file', file)

	const response = await apiInstance.post('/file/detectlanguage', formData)

	return response.data
}

export const learn = async ({ file, language }: { language: string; file: File }): Promise<any> => {
	const formData = new FormData()

	formData.append('file', file)
	// formData.append('expectedLanguage', language)

	await apiInstance.post(`/file/learndetectlanguage?expectedLanguage=${language}`, formData)
	return
}
