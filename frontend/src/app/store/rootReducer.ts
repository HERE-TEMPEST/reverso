import { combineReducers } from 'redux'

import { parsingTextReducer } from '@entities/text'
import { databaseWordReducer } from '@entities/database'
import { parseTextWordReducer } from '@features/parser'
import { modalReducer } from '@shared/ui'
import { treeParserReducer } from '@entities/tree'

export const rootReducer = combineReducers({
	parsingPage: parsingTextReducer,
	database: databaseWordReducer,
	parseText: parseTextWordReducer,
	modal: modalReducer,
	tree: treeParserReducer
})
