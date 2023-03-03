import { createAction } from '@reduxjs/toolkit'

import { IDatabaseWord, DatabaseWordActionsTokens } from '../database-word.types'

interface UpdateDatabaseWordInfoActionPayload {
	data: Partial<IDatabaseWord>
}

export const UpdateDatabaseWordInfoAction = createAction<
	UpdateDatabaseWordInfoActionPayload,
	DatabaseWordActionsTokens.UPDATE_DATABASE_WORD_INFO_ACTION
>(DatabaseWordActionsTokens.UPDATE_DATABASE_WORD_INFO_ACTION)
