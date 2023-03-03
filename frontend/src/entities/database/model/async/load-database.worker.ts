import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { ErrorInLoadingDatabaseWordInfoAction, LoadingDatabaseWordInfoAction, DatabaseWordLoadedInfoAction } from '../actions'

export const loadDatabaseWordWorker = function* (): any {
	try {
		yield put(LoadingDatabaseWordInfoAction())

		const data = yield call(() => api.database.getAllWords())

		yield put(DatabaseWordLoadedInfoAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInLoadingDatabaseWordInfoAction({ message: 'error' }))
	}
}
