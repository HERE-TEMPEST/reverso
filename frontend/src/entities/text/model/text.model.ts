import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import { UpdateTextInfoAction } from './actions'
import { TextState } from './text.types'

const initialState: TextState = {
	data: '',
	words: []
}

export const parsingTextReducer = createReducer(initialState, (builder) => {
	builder.addCase(UpdateTextInfoAction, (state, action) => {
		const { payload } = action

		const { data } = payload

		return {
			data: data,
			words: []
		}
	})
})
