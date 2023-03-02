/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */

export const convertToAngle = (matrix: string) => {
	if (matrix !== 'none') {
		const values = matrix.split('(')[1].split(')')[0].split(',')
		const a = Number(values[0])
		const b = Number(values[1])
		var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI))
	} else {
		var angle = 0
	}
	return angle
}
