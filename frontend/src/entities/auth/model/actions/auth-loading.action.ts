import { createAction } from '@reduxjs/toolkit'

import { AuthActionsTokens } from '../auth.types'

type LoadingAuthInfoActionPayload = undefined

export const LoadingAuthInfoAction = createAction<LoadingAuthInfoActionPayload, AuthActionsTokens.LOADING_USER_LOGIN_ACTION>(
	AuthActionsTokens.LOADING_USER_LOGIN_ACTION
)
