import { combineReducers } from 'redux'

import { parsingTextReducer } from '@entities/text'
import { databaseWordReducer } from '@entities/database'

export const rootReducer = combineReducers({
	parsingPage: parsingTextReducer,
	database: databaseWordReducer
})
