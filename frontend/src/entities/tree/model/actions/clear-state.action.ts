import { createAction } from '@reduxjs/toolkit'

import { TreeActionsTokens } from '../tree.types'

type ClearStateActionPayload = undefined

export const ClearStateAction = createAction<ClearStateActionPayload, TreeActionsTokens.CLEAR_TREE_PARSE_STATE_ACTION>(
	TreeActionsTokens.CLEAR_TREE_PARSE_STATE_ACTION
)
