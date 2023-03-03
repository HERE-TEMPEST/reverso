import { createAction } from '@reduxjs/toolkit'

import { ModalActionsTokens } from '../modal.types'

type ComplitingModalHandlerActionPayload = undefined

export const ComplitingModalHandlerAction = createAction<
	ComplitingModalHandlerActionPayload,
	ModalActionsTokens.COMPLITING_MODAL_HANDLER_INFO_ACTION
>(ModalActionsTokens.COMPLITING_MODAL_HANDLER_INFO_ACTION)
