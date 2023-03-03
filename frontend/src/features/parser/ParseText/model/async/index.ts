import { takeEvery } from 'redux-saga/effects'

import { loadParseTextInfo } from '../actions/async'

import { loadParseTextWorker } from './parse-text.worker'

export const parseTextWordAsyncActionsWatcher = function* () {
	yield takeEvery(loadParseTextInfo, loadParseTextWorker)
}
