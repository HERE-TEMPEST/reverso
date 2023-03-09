import { createAction } from '@reduxjs/toolkit'

import { IDatabaseWord, DatabaseWordActionsTokens } from '../database-word.types'

interface AddNewWordActionPayload {
	data: IDatabaseWord
}

export const AddNewWordAction = createAction<AddNewWordActionPayload, DatabaseWordActionsTokens.ADD_NEW_WORD_ACTION>(
	DatabaseWordActionsTokens.ADD_NEW_WORD_ACTION
)
