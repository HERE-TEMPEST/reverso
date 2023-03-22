export enum Case {
	nomn = 'nomn',
	gent = 'gent',
	datv = 'datv',
	accs = 'accs',
	ablt = 'ablt',
	loct = 'loct',
	voct = 'voct',
	gen1 = 'gen1',
	gen2 = 'gen2',
	acc2 = 'acc2',
	loc1 = 'loc1',
	loc2 = 'loc2'
}

export const cases = ['nomn', 'gent', 'datv', 'accs', 'ablt', 'loct', 'voct', 'gen1', 'gen2', 'acc2', 'loc1', 'loc2']

export const convertCase = (value: Case) => {
	const values = {
		nomn: 'именительный падеж',
		gent: 'родительный падеж',
		datv: 'дательный падеж',
		accs: 'винительный падеж',
		ablt: 'творительный падеж',
		loct: 'предложный падеж',
		voct: 'звательный падеж',
		gen1: 'первый родительный падеж',
		gen2: 'второй родительный падеж (частичный)',
		acc2: 'второй винительный падеж',
		loc1: 'первый предложный падеж',
		loc2: 'второй предложный падеж (местный)'
	}

	return values[value]
}
