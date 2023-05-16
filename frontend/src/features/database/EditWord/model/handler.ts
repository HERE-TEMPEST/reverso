import { InfoState } from './types'
import { call, put } from 'redux-saga/effects'

import { api } from '../../../../shared/api'
import { AddNewWordAction } from '../../../../entities/database'
import { appSelect } from '@shared/libs'
import { authSelectors } from '@entities/auth'

export const actionHandler = function* (state: InfoState): any {
	const userId = yield* appSelect(authSelectors.userId)

	yield call(() => api.database.addNewWord(userId, { word: state }))

	yield put(AddNewWordAction({ data: state }))
}
