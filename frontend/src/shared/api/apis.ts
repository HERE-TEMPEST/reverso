export const uris = {
	posts: {
		signIn: 'api/auth20/google/sign-in',
		refreshTokens: 'api/auth/tokens/refresh-tokens',
		createProject: 'api/projects',
		signOut: 'api/auth/tokens/sign-out',
		generateCV: '/asdasd'
	},
	gets: {
		userInfo(id: number) {
			return `api/profile/info/${id}`
		},
		allProjects(id: number) {
			return `api/projects/info/${id}`
		},
		allSkills: 'api/projects/skills'
	},
	patchs: {
		changeProjectStatusById(id: number) {
			return `api/projects/${id}`
		}
	},
	deletes: {
		deleteProjectStatusById(id: number) {
			return `api/projects/${id}`
		},
		deleteCvStatusById(id: number) {
			return `api/storage/${id}`
		}
	},

	puts: {
		userInfo: 'api/profile/info'
	}
}
