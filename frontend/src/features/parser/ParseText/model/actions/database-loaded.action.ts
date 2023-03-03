import { createAction } from '@reduxjs/toolkit'

import { ParseTextActionsTokens } from '../parse-text.types'

type ParseTextLoadedInfoActionPayload = undefined

export const ParseTextLoadedInfoAction = createAction<
	ParseTextLoadedInfoActionPayload,
	ParseTextActionsTokens.LOADED_PARSE_TEXT_INFO_ACTION
>(ParseTextActionsTokens.LOADED_PARSE_TEXT_INFO_ACTION)
