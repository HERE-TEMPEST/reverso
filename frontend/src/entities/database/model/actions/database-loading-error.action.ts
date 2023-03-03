import { createAction } from '@reduxjs/toolkit'

import { DatabaseWordActionsTokens } from '../database-word.types'

type ErrorInLoadingDatabaseWordInfoActionPayload = {
	message: string
}

export const ErrorInLoadingDatabaseWordInfoAction = createAction<
	ErrorInLoadingDatabaseWordInfoActionPayload,
	DatabaseWordActionsTokens.ERROR_IN_LOADING_DATABASE_WORD_INFO_ACTION
>(DatabaseWordActionsTokens.ERROR_IN_LOADING_DATABASE_WORD_INFO_ACTION)
