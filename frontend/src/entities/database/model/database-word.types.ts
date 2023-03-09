import { Animacy } from '../../../features/database/AddNewWord/model/enums/animacy'
import { Case } from '../../../features/database/AddNewWord/model/enums/case'
import { Gender } from '../../../features/database/AddNewWord/model/enums/gender'
import { Mood } from '../../../features/database/AddNewWord/model/enums/mood'
import { MNumber } from '../../../features/database/AddNewWord/model/enums/number'
import { Person } from '../../../features/database/AddNewWord/model/enums/person'
import { POST } from '../../../features/database/AddNewWord/model/enums/pos'
import { Tense } from '../../../features/database/AddNewWord/model/enums/tense'
import { Transitivity } from '../../../features/database/AddNewWord/model/enums/transitivity'
import { Voice } from '../../../features/database/AddNewWord/model/enums/voice'

export interface DatabaseFilters {
	name: string
	letter: string
}

export interface IDatabaseWord {
	word: string
	amount: number
	POS: POST
	animacy?: Animacy
	case?: Case
	gender?: Gender
	mood?: Mood
	number?: MNumber
	person?: Person
	tense?: Tense
	transitivity?: Transitivity
	voice?: Voice
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

  ADD_NEW_WORD_ACTION = 'ADD_NEW_WORD_ACTION',
  DELETE_WORD_ACTION = 'DELETE_WORD_ACTION',

	CHANGE_DATABASE_FILTERS_ACTION = 'CHANGE_DATABASE_FILTERS_ACTION',
	CLEAR_STATE_DATABASE_ACTION = 'CLEAR_STATE_DATABASE_ACTION',

	ASYNC_LOAD_DATABASE_WORD_INFO_ACTION = 'ASYNC_LOAD_DATABASE_WORD_INFO_ACTION'
}
