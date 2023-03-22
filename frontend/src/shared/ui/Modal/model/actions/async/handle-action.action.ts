import { createAction } from '@reduxjs/toolkit'

import { ModalActionsTokens } from '../../modal.types'

type HandleModalActionPayload = {
	handler: (state: any, meta: { token: string }) => Generator
	state: any
}

export const HandleModalAction = createAction<HandleModalActionPayload, ModalActionsTokens.ASYNC_MODAL_HANDLE_ACTION>(
	ModalActionsTokens.ASYNC_MODAL_HANDLE_ACTION
)
