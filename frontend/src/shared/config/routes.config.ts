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
