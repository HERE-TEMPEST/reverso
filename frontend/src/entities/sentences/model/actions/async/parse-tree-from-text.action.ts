import { createAction } from '@reduxjs/toolkit'
import { SentenceDataActionsTokens } from '../../sentences.types'

type ParseSentenceDataFromTextActionPayload = {
	text: string
}

export const ParseSentenceDataFromTextAction = createAction<
	ParseSentenceDataFromTextActionPayload,
	SentenceDataActionsTokens.ASYNC_PARSE_SENTENCE_FROM_TEXT_ACTION
>(SentenceDataActionsTokens.ASYNC_PARSE_SENTENCE_FROM_TEXT_ACTION)
