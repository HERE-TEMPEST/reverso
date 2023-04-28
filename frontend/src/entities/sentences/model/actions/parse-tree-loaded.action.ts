import { createAction } from '@reduxjs/toolkit'

import { SentenceDataActionsTokens, SentenceDataState } from '../sentences.types'

interface ParsedSentenceDataFromTextActionPayload {
	data: SentenceDataState['data']
}

export const ParsedSentenceDataFromTextAction = createAction<
	ParsedSentenceDataFromTextActionPayload,
	SentenceDataActionsTokens.LOADED_PARSE_SENTENCE_FROM_TEXT_ACTION
>(SentenceDataActionsTokens.LOADED_PARSE_SENTENCE_FROM_TEXT_ACTION)
