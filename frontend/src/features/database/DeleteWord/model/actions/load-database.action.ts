import { createAction } from '@reduxjs/toolkit'
import { DeleteWordActionsTokens } from '../database-word.types'

type DeleteWordActionPayload = {
	word: string
}

export const DeleteWordAction = createAction<DeleteWordActionPayload, DeleteWordActionsTokens.ASYNC_DELETE_WORD_ACTION>(
	DeleteWordActionsTokens.ASYNC_DELETE_WORD_ACTION
)
