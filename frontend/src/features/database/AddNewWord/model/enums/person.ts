export enum Person {
	'1per' = '1per',
	'2per' = '2per',
	'3per' = '3per'
}

export const persons = ['1per', '2per', '3per']

export const convertPerson = (value: Person) => {
	const values = {
		'1per': '1 лицо',
		'2per': '2 лицо',
		'3per': '3 лицо'
	}

	return values[value]
}
