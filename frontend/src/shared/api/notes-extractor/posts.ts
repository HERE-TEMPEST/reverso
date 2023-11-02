import { apiInstance } from '../api-instance'

export const extract = async ({
	file,
	amountSentences
}: {
	file: File
	amountSentences: number
}): Promise<{ key: string; sent: string; neuro: string }> => {
	const formData = new FormData()

	formData.append('file', file)

	const response = await apiInstance.post(`/file/make_shorter?num=${amountSentences}`, formData)

	const { key, sent, neuro } = response.data

	return { key, sent, neuro }
}
