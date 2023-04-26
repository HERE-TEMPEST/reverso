import { createAction } from '@reduxjs/toolkit'

import { TreeActionsTokens } from '../tree.types'

type ParsingTreeFromTextActionPayload = undefined

export const ParsingTreeFromTextAction = createAction<
	ParsingTreeFromTextActionPayload,
	TreeActionsTokens.LOADING_PARSE_TREE_FROM_TEXT_ACTION
>(TreeActionsTokens.LOADING_PARSE_TREE_FROM_TEXT_ACTION)
