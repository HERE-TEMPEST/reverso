import { createAction } from '@reduxjs/toolkit'
import { AuthActionsTokens } from '../../auth.types'

type LoadAuthInfoActionPayload = {
	login: string
	password: string
}

export const loadAuthInfo = createAction<LoadAuthInfoActionPayload, AuthActionsTokens.ASYNC_LOADING_USER_LOGIN_ACTION>(
	AuthActionsTokens.ASYNC_LOADING_USER_LOGIN_ACTION
)
