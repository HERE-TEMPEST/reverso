import { createAction } from '@reduxjs/toolkit'

import { ModalActionsTokens } from '../modal.types'

type ClearModalStateActionPayload = undefined

export const ClearModalStateAction = createAction<ClearModalStateActionPayload, ModalActionsTokens.CLEAR_MODAL_STATE_ACTION>(
	ModalActionsTokens.CLEAR_MODAL_STATE_ACTION
)
