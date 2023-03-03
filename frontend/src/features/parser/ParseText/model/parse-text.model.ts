import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import {
	ParseTextLoadedInfoAction,
	ErrorInLoadingParseTextInfoAction,
	LoadingParseTextInfoAction,
	CleaerStateParseTextAction
} from './actions'

import { ParseTextState } from './parse-text.types'

const initialState: ParseTextState = {
	isLoading: false,
	isLoaded: false,
	isFailed: false,
	error: null
}

export const parseTextWordReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(LoadingParseTextInfoAction, (state) => {
			return {
				...state,
				isLoading: true,
				isLoaded: false,
				isFailed: false,
				error: null
			}
		})

		.addCase(ParseTextLoadedInfoAction, (state, action) => {
			return {
				...state,
				isLoading: false,
				isLoaded: true,
				isFailed: false,
				error: null
			}
		})

		.addCase(CleaerStateParseTextAction, () => {
			return {
				...initialState
			}
		})

		.addCase(ErrorInLoadingParseTextInfoAction, (state, action) => {
			const {
				payload: { message }
			} = action

			return {
				...state,
				isLoading: false,
				isLoaded: true,
				isFailed: true,
				error: message
			}
		})
})
