export interface AuthState {
	userId: number
	isLoading: boolean
	isLoaded: boolean
	isFailed: boolean
	error: null | string
}

export enum AuthActionsTokens {
	LOADING_USER_LOGIN_ACTION = 'LOADING_USER_LOGIN_ACTION',
	USER_LOGINED_ACTION = 'USER_LOGINED_ACTION',
	ERROR_IN_LOADING_USER_LOGIN_ACTION = 'ERROR_IN_LOADING_USER_LOGIN_ACTION',
	ASYNC_LOADING_USER_LOGIN_ACTION = 'ASYNC_LOADING_USER_LOGIN_ACTION'
}
