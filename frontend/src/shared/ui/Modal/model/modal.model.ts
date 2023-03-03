import { createReducer } from '@reduxjs/toolkit'
import {
	ClearModalStateAction,
	ComplitingModalHandlerAction,
	ErrorInComplitingModalHandlerAction,
	ModalHandlerComplitedAction
} from './actions'

import { ModalState } from './modal.types'

const initialState: ModalState = {
	isLoading: false,
	isLoaded: false,
	isFailed: false,
	error: null
}

export const modalReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(ComplitingModalHandlerAction, () => {
			return {
				isLoading: true,
				isLoaded: false,
				isFailed: false,
				error: null
			}
		})

		.addCase(ModalHandlerComplitedAction, () => {
			return {
				isLoading: false,
				isLoaded: true,
				isFailed: false,
				error: null
			}
		})

		.addCase(ErrorInComplitingModalHandlerAction, (state, action) => {
			const {
				payload: { message }
			} = action

			return {
				isLoading: false,
				isLoaded: true,
				isFailed: true,
				error: message
			}
		})

		.addCase(ClearModalStateAction, () => {
			return {
				isLoading: false,
				isLoaded: false,
				isFailed: false,
				error: null
			}
		})
})
