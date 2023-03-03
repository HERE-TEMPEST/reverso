import { createAction } from '@reduxjs/toolkit'

import { ModalActionsTokens } from '../modal.types'

type ModalHandlerComplitedActionPayload = undefined

export const ModalHandlerComplitedAction = createAction<
	ModalHandlerComplitedActionPayload,
	ModalActionsTokens.COMPLITED_MODAL_HANDLER_INFO_ACTION
>(ModalActionsTokens.COMPLITED_MODAL_HANDLER_INFO_ACTION)
