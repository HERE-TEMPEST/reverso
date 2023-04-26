import { createAction } from '@reduxjs/toolkit'

import { TreeActionsTokens } from '../tree.types'

type ErrorInParsingTreeFromTextActionPayload = {
	message: string
}

export const ErrorInParsingTreeFromTextAction = createAction<
	ErrorInParsingTreeFromTextActionPayload,
	TreeActionsTokens.ERROR_PARSE_TREE_FROM_TEXT_ACTION
>(TreeActionsTokens.ERROR_PARSE_TREE_FROM_TEXT_ACTION)
