export enum POST {
	NOUN = 'NOUN',
	ADJF = 'ADJF',
	ADJS = 'ADJS',
	COMP = 'COMP',
	VERB = 'VERB',
	INFN = 'INFN',
	PRTF = 'PRTF',
	PRTS = 'PRTS',
	GRND = 'GRND',
	NUMR = 'NUMR',
	ADVB = 'ADVB',
	NPRO = 'NPRO',
	PRED = 'PRED',
	PREP = 'PREP',
	CONJ = 'CONJ',
	PRCL = 'PRCL',
	INTJ = 'INTJ'
}

export const posts = [
	'NOUN',
	'ADJF',
	'ADJS',
	'COMP',
	'VERB',
	'INFN',
	'PRTF',
	'PRTS',
	'GRND',
	'NUMR',
	'ADVB',
	'NPRO',
	'PRED',
	'PREP',
	'CONJ',
	'PRCL',
	'INTJ'
]
export const convertPost = (value: POST) => {
	const values = {
		NOUN: 'имя существительное',
		ADJF: 'имя прилагательное (полное)',
		ADJS: 'имя прилагательное (краткое)	',
		COMP: 'компаратив',
		VERB: 'глагол (личная форма)',
		INFN: 'глагол (инфинитив)',
		PRTF: 'причастие (полное)',
		PRTS: 'причастие (краткое)	',
		GRND: 'деепричастие',
		NUMR: 'числительное',
		ADVB: 'наречие',
		NPRO: 'местоимение-существительное',
		PRED: 'предикатив',
		PREP: 'предлог',
		CONJ: 'союз',
		PRCL: 'частица',
		INTJ: 'междометие'
	}

	return values[value]
}
