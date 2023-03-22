export enum Tense {
	pres = 'pres',
	past = 'past',
	futr = 'futr'
}

export const tenses = ['pres', 'past', 'futr']

export const convertTense = (value: Tense) => {
	const values = {
		pres: 'настоящее время',
		past: 'прошедшее время',
		futr: 'будущее время'
	}

	return values[value]
}
