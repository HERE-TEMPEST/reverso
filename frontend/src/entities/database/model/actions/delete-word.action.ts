import { createAction } from '@reduxjs/toolkit'

import { IDatabaseWord, DatabaseWordActionsTokens } from '../database-word.types'

interface DeleteWordActionPayload {
	data: string
}

export const DeleteWordAction = createAction<DeleteWordActionPayload, DatabaseWordActionsTokens.DELETE_WORD_ACTION>(
	DatabaseWordActionsTokens.DELETE_WORD_ACTION
)
