import { call } from 'redux-saga/effects'
import { api } from '@shared/api'

import { appSelect } from '@shared/libs'

import { databaseSelectors } from '@entities/database'

export const loadSaveDatabaseWorker = function* (): any {
	try {
		const database = yield* appSelect(databaseSelectors.database)

		yield call(() => api.database.saveDatabase({ database }))
	} catch (e: any) {
		return
	}
}
