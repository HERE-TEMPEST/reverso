import { createAction } from '@reduxjs/toolkit'

import { TextState, TextActionsTokens } from '../text.types'

interface UpdateTextInfoActionPayload {
	data: TextState['data']
}

export const UpdateTextInfoAction = createAction<UpdateTextInfoActionPayload, TextActionsTokens.UPDATE_TEXT_ACTION>(
	TextActionsTokens.UPDATE_TEXT_ACTION
)
