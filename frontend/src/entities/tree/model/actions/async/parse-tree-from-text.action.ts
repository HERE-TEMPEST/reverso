import { createAction } from '@reduxjs/toolkit'
import { TreeActionsTokens } from '../../tree.types'

type ParseTreeFromTextActionPayload = {
	text: string
}

export const ParseTreeFromTextAction = createAction<
	ParseTreeFromTextActionPayload,
	TreeActionsTokens.ASYNC_PARSE_TREE_FROM_TEXT_ACTION
>(TreeActionsTokens.ASYNC_PARSE_TREE_FROM_TEXT_ACTION)
