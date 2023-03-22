import { takeEvery } from 'redux-saga/effects'

import { SaveDataOnDatabase } from '../actions/async'

import { loadSaveDatabaseWorker } from './parse-text.worker'

export const saveDatabaseAsyncActionsWatcher = function* () {
	yield takeEvery(SaveDataOnDatabase, loadSaveDatabaseWorker)
}
