import { createAction } from '@reduxjs/toolkit'
import { ParseTextActionsTokens } from '../../parse-text.types'

type LoadParseTextInfoActionPayload = undefined

export const loadParseTextInfo = createAction<
	LoadParseTextInfoActionPayload,
	ParseTextActionsTokens.ASYNC_LOAD_PARSE_TEXT_INFO_ACTION
>(ParseTextActionsTokens.ASYNC_LOAD_PARSE_TEXT_INFO_ACTION)
