import { createAction } from '@reduxjs/toolkit'

import { DatabaseWordActionsTokens } from '../database-word.types'

type LoadingDatabaseWordInfoActionPayload = undefined

export const LoadingDatabaseWordInfoAction = createAction<
	LoadingDatabaseWordInfoActionPayload,
	DatabaseWordActionsTokens.LOADING_DATABASE_WORD_INFO_ACTION
>(DatabaseWordActionsTokens.LOADING_DATABASE_WORD_INFO_ACTION)
