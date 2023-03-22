export enum Animacy {
	anim = 'anim',
	inan = 'inan'
}

export const animacies = ['anim', 'inan']

export const convertAnimacy = (value: Animacy) => {
	const values = {
		anim: 'одушевлённое',
		inan: 'неодушевлённое'
	}

	return values[value]
}
