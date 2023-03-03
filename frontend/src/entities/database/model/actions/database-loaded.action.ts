import { createAction } from '@reduxjs/toolkit'

import { IDatabaseWord, DatabaseWordActionsTokens } from '../database-word.types'

interface DatabaseWordLoadedInfoActionPayload {
	data: Array<IDatabaseWord>
}

export const DatabaseWordLoadedInfoAction = createAction<
	DatabaseWordLoadedInfoActionPayload,
	DatabaseWordActionsTokens.LOADED_DATABASE_WORD_INFO_ACTION
>(DatabaseWordActionsTokens.LOADED_DATABASE_WORD_INFO_ACTION)
