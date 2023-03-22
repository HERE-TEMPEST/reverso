export enum Mood {
	indc = 'indc',
	impr = 'impr'
}

export const moods = ['indc', 'impr']

export const convertMood = (value: Mood) => {
	const values = {
		indc: 'изъявительное наклонение',
		impr: 'повелительное наклонение'
	}

	return values[value]
}
