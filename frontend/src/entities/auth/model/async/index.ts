import { takeEvery } from 'redux-saga/effects'

import { loadAuthInfo } from '../actions/async'

import { loadAuthWorker } from './load-login.worker'

export const databaseWordAsyncActionsWatcher = function* () {
	yield takeEvery(loadAuthInfo, loadAuthWorker)
}
