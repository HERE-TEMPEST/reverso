import { createAction } from '@reduxjs/toolkit'

import { SentenceDataActionsTokens } from '../sentences.types'

type ClearStateActionPayload = undefined

export const ClearStateAction = createAction<
	ClearStateActionPayload,
	SentenceDataActionsTokens.CLEAR_SENTENCE_PARSE_STATE_ACTION
>(SentenceDataActionsTokens.CLEAR_SENTENCE_PARSE_STATE_ACTION)
