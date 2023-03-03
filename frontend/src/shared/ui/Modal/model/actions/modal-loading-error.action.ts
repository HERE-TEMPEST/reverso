import { createAction } from '@reduxjs/toolkit'

import { ModalActionsTokens } from '../modal.types'

type ErrorInComplitingModalHandlerActionPayload = {
	message: string
}

export const ErrorInComplitingModalHandlerAction = createAction<
	ErrorInComplitingModalHandlerActionPayload,
	ModalActionsTokens.ERROR_IN_COMPLITING_MODAL_HANDLER_INFO_ACTION
>(ModalActionsTokens.ERROR_IN_COMPLITING_MODAL_HANDLER_INFO_ACTION)
