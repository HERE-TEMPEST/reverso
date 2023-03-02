export function arrayBufferToString(buf: ArrayBuffer) {
	return String.fromCharCode.apply(null, new Uint16Array(buf) as any)
}
