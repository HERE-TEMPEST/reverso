import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import {
	UpdateTextInfoAction,
	ClearStateAction,
	ErrorInParsingSentenceDataFromTextAction,
	ParsedSentenceDataFromTextAction,
	ParsingSentenceDataFromTextAction
} from './actions'
import { SentenceDataState } from './sentences.types'

const initialState: SentenceDataState = {
	data: {
		graph: [],
		nodes: []
	}
}

export const sentenceDataParserReducer = createReducer(initialState, (builder) => {
	builder.addCase(UpdateTextInfoAction, (state, action) => {
		const { payload } = action

		const { data } = payload

		return {
			...state,
			data,
			error: undefined
		}
	})

	builder.addCase(ParsingSentenceDataFromTextAction, (state) => {
		return { ...state }
	})

	builder.addCase(ParsedSentenceDataFromTextAction, (state, action) => {
		const { payload } = action

		const { data } = payload

		return { ...state, data, error: undefined }
	})

	builder.addCase(ErrorInParsingSentenceDataFromTextAction, (state, action) => {
		const { payload } = action

		const { message, word } = payload

		return {
			data: state.data,
			error: {
				message,
				word
			}
		}
	})

	builder.addCase(ClearStateAction, () => {
		return { ...initialState }
	})
})
