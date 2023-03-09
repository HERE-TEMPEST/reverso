import { InfoState } from './types'
import { call, put } from 'redux-saga/effects'

import { api } from '../../../../shared/api'
import { AddNewWordAction } from '../../../../entities/database'

export const actionHandler = function* (state: InfoState): any {
	yield call(() => api.database.addNewWord({ word: state }))

	yield put(AddNewWordAction({ data: state }))
}
