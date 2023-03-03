export const appRoutes = {
	database: {
		path: 'database',
		goto() {
			return '/database'
		}
	},
	parser: {
		path: '/',
		goto() {
			return '/'
		}
	},
	parsedText: {
		path: 'parsed-text',
		goto() {
			return '/parsed-text'
		}
	},
	supports: {
		path: 'supports',
		goto() {
			return '/supports'
		}
	},
	base: {
		path: '/',
		goto() {
			return '/'
		}
	}
}
