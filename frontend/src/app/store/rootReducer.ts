import { combineReducers } from 'redux'

import { parsingTextReducer } from '@entities/text'

export const rootReducer = combineReducers({
	parsingPage: parsingTextReducer
})
