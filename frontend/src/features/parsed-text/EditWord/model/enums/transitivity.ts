export enum Transitivity {
	tran = 'tran',
	intr = 'intr'
}

export const transitivities = ['tran', 'intr']

export const convertTransitivity = (value: Transitivity) => {
	const values = {
		tran: 'переходный',
		intr: 'непереходный'
	}

	return values[value]
}
