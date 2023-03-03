import { takeEvery } from 'redux-saga/effects'

import { loadDatabaseWordInfo } from '../actions/async'

import { loadDatabaseWordWorker } from './load-database.worker'

export const databaseWordAsyncActionsWatcher = function* () {
	yield takeEvery(loadDatabaseWordInfo, loadDatabaseWordWorker)
}
