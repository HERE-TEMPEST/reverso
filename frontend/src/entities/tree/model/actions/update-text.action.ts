import { createAction } from '@reduxjs/toolkit'

import { TreeActionsTokens, TreeState } from '../tree.types'

interface UpdateTextInfoActionPayload {
	data: TreeState['data']
}

export const UpdateTextInfoAction = createAction<UpdateTextInfoActionPayload, TreeActionsTokens.UPDATE_TREE_TEXT_ACTION>(
	TreeActionsTokens.UPDATE_TREE_TEXT_ACTION
)
