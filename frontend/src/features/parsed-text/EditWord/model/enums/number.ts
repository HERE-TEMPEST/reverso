export enum MNumber {
	sing = 'sing',
	plur = 'plur'
}

export const numbers = ['sing', 'plur']

export const convertNumber = (value: MNumber) => {
	const values = {
		sing: 'единственное число',
		plur: 'множественное число'
	}

	return values[value]
}
