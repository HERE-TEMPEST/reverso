import { call } from 'redux-saga/effects'
import { api } from '@shared/api'

import { appSelect } from '@shared/libs'

import { databaseSelectors } from '@entities/database'
import { authSelectors } from '@entities/auth'

export const loadSaveDatabaseWorker = function* (): any {
	try {
		const userId = yield* appSelect(authSelectors.userId)

		const database = yield* appSelect(databaseSelectors.database)

		yield call(() => api.database.saveDatabase(userId, { database }))
	} catch (e: any) {
		return
	}
}
