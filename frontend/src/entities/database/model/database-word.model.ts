import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import {
	ChangeDatabaseFiltersAction,
	ChangeStateDatabaseAction,
	DatabaseWordLoadedInfoAction,
	ErrorInLoadingDatabaseWordInfoAction,
	LoadingDatabaseWordInfoAction
} from './actions'

import { DatabaseFilters, DatabaseWordState, IDatabaseWord } from './database-word.types'

const initialState: DatabaseWordState = {
	data: [],
	_data: [],
	filters: { letter: '', name: '' },
	isLoading: false,
	isLoaded: false,
	isFailed: false,
	error: null
}

export const databaseWordReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(LoadingDatabaseWordInfoAction, (state) => {
			return {
				...state,
				data: [],
				_data: [],
				isLoading: true,
				isLoaded: false,
				isFailed: false,
				error: null
			}
		})

		.addCase(DatabaseWordLoadedInfoAction, (state, action) => {
			const { payload } = action

			const { data } = payload

			const sortedData = data.sort((a: IDatabaseWord, b: IDatabaseWord) => a.word.localeCompare(b.word))

			return {
				...state,
				data: applyDatabaseFilters(state.filters, sortedData),
				_data: sortedData,
				isLoading: false,
				isLoaded: true,
				isFailed: false,
				error: null
			}
		})

		.addCase(ChangeDatabaseFiltersAction, (state, action) => {
			const { payload } = action

			const { filters } = payload

			const newFilters = mergeDatabaseFilters(state.filters, filters)

			return {
				...state,
				filters: newFilters,
				data: applyDatabaseFilters(newFilters, state._data),
				isLoading: false,
				isLoaded: true,
				isFailed: false,
				error: null
			}
		})

		.addCase(ChangeStateDatabaseAction, () => {
			return {
				...initialState
			}
		})

		.addCase(ErrorInLoadingDatabaseWordInfoAction, (state, action) => {
			const {
				payload: { message }
			} = action

			return {
				...state,
				data: [],
				_data: [],
				isLoading: false,
				isLoaded: true,
				isFailed: true,
				error: message
			}
		})
})

function mergeDatabaseFilters(prevFilters: DatabaseFilters, nextFilters: Partial<DatabaseFilters>): DatabaseFilters {
	return {
		...prevFilters,
		...nextFilters
	}
}

function applyDatabaseFilters(filters: any, data: Array<IDatabaseWord>): Array<IDatabaseWord> {
	const filtersPipes: { [key: string]: (filter: any, data: Array<IDatabaseWord>) => Array<IDatabaseWord> } = {
		name: (filter: string, data) => {
			return data.filter((proj) => proj.word.toLowerCase().includes(filter.toLowerCase()))
		},
		letter: (filter: string, data) => {
			return data.filter((proj) => filter === '' || proj.word.toLowerCase().startsWith(filter.toLowerCase()))
		}
	}

	return _.keys(filtersPipes).reduce((prev, key) => filtersPipes[key](filters[key], prev), data)
}
