import { arrayBufferToString } from '@shared/libs'

export const loadFile = async (file: File, callback: (content: string) => void) => {
	const fileReader = new FileReader()

	fileReader.onloadend = () => {
		const content = fileReader.result

		if (content) {
			if (content instanceof ArrayBuffer) {
				const covertedContent = arrayBufferToString(content)
				callback(covertedContent)
			} else {
				callback(content)
			}
		} else {
			callback('')
		}
	}

	fileReader.readAsText(file)
}
