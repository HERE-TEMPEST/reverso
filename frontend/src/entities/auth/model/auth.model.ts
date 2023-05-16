import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import { AuthLoadedInfoAction, ErrorInLoadingAuthInfoAction, LoadingAuthInfoAction } from './actions'

import { AuthState } from './auth.types'

const initialState: AuthState = {
	userId: -1,
	isLoading: false,
	isLoaded: false,
	isFailed: false,
	error: null
}

export const authReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(LoadingAuthInfoAction, (state) => {
			return {
				...state,
				userId: -1,
				isLoading: true,
				isLoaded: false,
				isFailed: false,
				error: null
			}
		})

		.addCase(AuthLoadedInfoAction, (state, action) => {
			const { payload } = action

			const { userId } = payload

			return {
				...state,
				userId: userId,
				isLoading: false,
				isLoaded: true,
				isFailed: false,
				error: null
			}
		})

		.addCase(ErrorInLoadingAuthInfoAction, (state, action) => {
			const {
				payload: { message }
			} = action

			return {
				...state,
				userId: -1,
				isLoading: false,
				isLoaded: true,
				isFailed: true,
				error: message
			}
		})
})
