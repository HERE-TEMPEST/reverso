import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import {
	UpdateTextInfoAction,
	ClearStateAction,
	ErrorInParsingTreeFromTextAction,
	ParsedTreeFromTextAction,
	ParsingTreeFromTextAction
} from './actions'
import { TreeState } from './tree.types'

const initialState: TreeState = {
	data: '',
	tree: {
		imageUrl: '',
		line: '',
		treeLine: ''
	}
}

export const treeParserReducer = createReducer(initialState, (builder) => {
	builder.addCase(UpdateTextInfoAction, (state, action) => {
		const { payload } = action

		const { data } = payload

		return {
			...state,
			data: data
		}
	})

	builder.addCase(ParsingTreeFromTextAction, (state) => {
		return { ...state }
	})

	builder.addCase(ParsedTreeFromTextAction, (state, action) => {
		const { payload } = action

		const { data } = payload

		return { ...state, tree: data }
	})

	builder.addCase(ErrorInParsingTreeFromTextAction, (state, action) => {
		const { payload } = action

		const { message } = payload

		return {
			data: state.data,
			tree: {
				line: message,
				treeLine: message,
				imageUrl: ''
			}
		}
	})

	builder.addCase(ClearStateAction, () => {
		return { ...initialState }
	})
})
