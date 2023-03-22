import { createAction } from '@reduxjs/toolkit'

import { ParseTextActionsTokens } from '../parse-text.types'

type LoadingParseTextInfoActionPayload = undefined

export const LoadingParseTextInfoAction = createAction<
	LoadingParseTextInfoActionPayload,
	ParseTextActionsTokens.LOADING_PARSE_TEXT_INFO_ACTION
>(ParseTextActionsTokens.LOADING_PARSE_TEXT_INFO_ACTION)
