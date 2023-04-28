import { createAction } from '@reduxjs/toolkit'

import { SentenceDataActionsTokens } from '../sentences.types'

type ParsingSentenceDataFromTextActionPayload = undefined

export const ParsingSentenceDataFromTextAction = createAction<
	ParsingSentenceDataFromTextActionPayload,
	SentenceDataActionsTokens.LOADING_PARSE_SENTENCE_FROM_TEXT_ACTION
>(SentenceDataActionsTokens.LOADING_PARSE_SENTENCE_FROM_TEXT_ACTION)
