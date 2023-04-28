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
	dependencies: {
		path: '/dependencies',
		goto() {
			return '/dependencies'
		}
	},
	wordDependencies: {
		path: '/word-dependencies',
		goto() {
			return '/word-dependencies'
		}
	},
	parseSentense: {
		path: '/tree',
		goto() {
			return '/tree'
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
