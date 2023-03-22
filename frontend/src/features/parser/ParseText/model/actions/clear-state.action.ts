import { createAction } from '@reduxjs/toolkit'

import { ParseTextActionsTokens } from '../parse-text.types'

type ClearStateActionPayload = undefined

export const CleaerStateParseTextAction = createAction<
	ClearStateActionPayload,
	ParseTextActionsTokens.CLEAR_STATE_PARSE_TEXT_ACTION
>(ParseTextActionsTokens.CLEAR_STATE_PARSE_TEXT_ACTION)
