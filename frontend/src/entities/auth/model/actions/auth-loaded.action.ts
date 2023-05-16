import { createAction } from '@reduxjs/toolkit'
import { AuthActionsTokens } from '../auth.types'

interface AuthLoadedInfoActionPayload {
	userId: number
}

export const AuthLoadedInfoAction = createAction<AuthLoadedInfoActionPayload, AuthActionsTokens.USER_LOGINED_ACTION>(
	AuthActionsTokens.USER_LOGINED_ACTION
)
