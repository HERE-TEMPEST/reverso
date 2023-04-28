import { createAction } from '@reduxjs/toolkit'

import { SentenceDataActionsTokens, SentenceDataState } from '../sentences.types'

interface UpdateTextInfoActionPayload {
	data: SentenceDataState['data']
}

export const UpdateTextInfoAction = createAction<
	UpdateTextInfoActionPayload,
	SentenceDataActionsTokens.UPDATE_SENTENCE_TEXT_ACTION
>(SentenceDataActionsTokens.UPDATE_SENTENCE_TEXT_ACTION)
