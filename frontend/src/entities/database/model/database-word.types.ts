export interface DatabaseFilters {
	name: string
	letter: string
}

export interface IDatabaseWord {
	word: string
	amount: number
	POS: string
	animacy?: string
	case?: string
	gender?: string
	mood?: string
	number?: string
	person?: string
	tense?: string
	transitivity?: string
	voice?: string
}

export interface DatabaseWordState {
	data: Array<IDatabaseWord>
	_data: Array<IDatabaseWord>
	filters: DatabaseFilters
	isLoading: boolean
	isLoaded: boolean
	isFailed: boolean
	error: null | string
}

export enum DatabaseWordActionsTokens {
	LOADING_DATABASE_WORD_INFO_ACTION = 'LOADING_DATABASE_WORD_INFO_ACTION',
	LOADED_DATABASE_WORD_INFO_ACTION = 'LOADED_DATABASE_WORD_INFO_ACTION',
	ERROR_IN_LOADING_DATABASE_WORD_INFO_ACTION = 'ERROR_IN_LOADING_DATABASE_WORD_INFO_ACTION',
	UPDATE_DATABASE_WORD_INFO_ACTION = 'UPDATE_DATABASE_WORD_INFO_ACTION',

	CHANGE_DATABASE_FILTERS_ACTION = 'CHANGE_DATABASE_FILTERS_ACTION',
	CLEAR_STATE_DATABASE_ACTION = 'CLEAR_STATE_DATABASE_ACTION',

	ASYNC_LOAD_DATABASE_WORD_INFO_ACTION = 'ASYNC_LOAD_DATABASE_WORD_INFO_ACTION'
}
