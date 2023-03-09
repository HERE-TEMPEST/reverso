export enum Gender {
	masc = 'masc',
	femn = 'femn',
	neut = 'neut',
	'ms-f' = 'ms-f'
}

export const genders = ['masc', 'femn', 'neut', 'ms-f']

export const convertGender = (value: Gender) => {
	const values = {
		masc: 'мужской род',
		femn: 'женский род',
		neut: 'средний род',
		'ms-f': 'общий род (м/ж)	'
	}

	return values[value]
}
