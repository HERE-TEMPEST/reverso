import { createAction } from '@reduxjs/toolkit'
import { DatabaseWordActionsTokens } from '../../database-word.types'

type LoadDatabaseWordInfoActionPayload = undefined

export const loadDatabaseWordInfo = createAction<
	LoadDatabaseWordInfoActionPayload,
	DatabaseWordActionsTokens.ASYNC_LOAD_DATABASE_WORD_INFO_ACTION
>(DatabaseWordActionsTokens.ASYNC_LOAD_DATABASE_WORD_INFO_ACTION)
