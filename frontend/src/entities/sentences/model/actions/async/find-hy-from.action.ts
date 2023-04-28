import { createAction } from '@reduxjs/toolkit'
import { SentenceDataActionsTokens } from '../../sentences.types'

type FindHyFromTwoWordsActionPayload = {
	word1: string
	word2: string
}

export const FindHyFromTwoWordsAction = createAction<
	FindHyFromTwoWordsActionPayload,
	SentenceDataActionsTokens.ASYNC_FIND_HY_TEXT_ACTION
>(SentenceDataActionsTokens.ASYNC_FIND_HY_TEXT_ACTION)
