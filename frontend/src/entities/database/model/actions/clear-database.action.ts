import { createAction } from '@reduxjs/toolkit'

import { DatabaseWordActionsTokens } from '../database-word.types'

type ClearStateActionPayload = undefined

export const ChangeStateDatabaseAction = createAction<
	ClearStateActionPayload,
	DatabaseWordActionsTokens.CLEAR_STATE_DATABASE_ACTION
>(DatabaseWordActionsTokens.CLEAR_STATE_DATABASE_ACTION)
