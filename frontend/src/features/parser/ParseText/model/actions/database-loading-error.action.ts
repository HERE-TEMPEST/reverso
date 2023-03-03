import { createAction } from '@reduxjs/toolkit'

import { ParseTextActionsTokens } from '../parse-text.types'

type ErrorInLoadingParseTextInfoActionPayload = {
	message: string
}

export const ErrorInLoadingParseTextInfoAction = createAction<
	ErrorInLoadingParseTextInfoActionPayload,
	ParseTextActionsTokens.ERROR_IN_LOADING_PARSE_TEXT_INFO_ACTION
>(ParseTextActionsTokens.ERROR_IN_LOADING_PARSE_TEXT_INFO_ACTION)
