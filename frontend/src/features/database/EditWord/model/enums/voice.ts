export enum Voice {
	actv = 'actv',
	pssv = 'pssv'
}

export const voices = ['actv', 'pssv']

export const convertVoice = (value: Voice) => {
	const values = {
		actv: 'действительный залог',
		pssv: 'страдательный залог'
	}

	return values[value]
}
