import { createAction } from '@reduxjs/toolkit'

import { TreeActionsTokens, TreeState } from '../tree.types'

interface ParsedTreeFromTextActionPayload {
	data: TreeState['tree']
}

export const ParsedTreeFromTextAction = createAction<
	ParsedTreeFromTextActionPayload,
	TreeActionsTokens.LOADED_PARSE_TREE_FROM_TEXT_ACTION
>(TreeActionsTokens.LOADED_PARSE_TREE_FROM_TEXT_ACTION)
