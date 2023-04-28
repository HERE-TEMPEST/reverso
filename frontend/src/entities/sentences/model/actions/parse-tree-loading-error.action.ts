import { createAction } from '@reduxjs/toolkit'

import { SentenceDataActionsTokens } from '../sentences.types'

type ErrorInParsingSentenceDataFromTextActionPayload = {
	message: string
	word: string
}

export const ErrorInParsingSentenceDataFromTextAction = createAction<
	ErrorInParsingSentenceDataFromTextActionPayload,
	SentenceDataActionsTokens.ERROR_PARSE_SENTENCE_FROM_TEXT_ACTION
>(SentenceDataActionsTokens.ERROR_PARSE_SENTENCE_FROM_TEXT_ACTION)
