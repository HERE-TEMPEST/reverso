import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'
import { appSelect } from '@shared/libs'

import { ErrorInLoadingDatabaseWordInfoAction, LoadingDatabaseWordInfoAction, DatabaseWordLoadedInfoAction } from '../actions'
import { authSelectors } from '@entities/auth'

export const loadDatabaseWordWorker = function* (): any {
	try {
		const userId = yield* appSelect(authSelectors.userId)

		console.log({ userId })

		yield put(LoadingDatabaseWordInfoAction())

		const data = yield call(() => api.database.getAllWords(userId))

		yield put(DatabaseWordLoadedInfoAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInLoadingDatabaseWordInfoAction({ message: 'error' }))
	}
}
