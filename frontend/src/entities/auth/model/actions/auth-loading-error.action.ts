import { createAction } from '@reduxjs/toolkit'

import { AuthActionsTokens } from '../auth.types'

type ErrorInLoadingAuthInfoActionPayload = {
	message: string
}

export const ErrorInLoadingAuthInfoAction = createAction<
	ErrorInLoadingAuthInfoActionPayload,
	AuthActionsTokens.ERROR_IN_LOADING_USER_LOGIN_ACTION
>(AuthActionsTokens.ERROR_IN_LOADING_USER_LOGIN_ACTION)
