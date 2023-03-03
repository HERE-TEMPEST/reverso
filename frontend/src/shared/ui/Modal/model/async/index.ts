import { takeEvery } from 'redux-saga/effects'

import { HandleModalAction } from '../actions/async'

import { handleModalActionWorker } from './handle-action.worker'

export const modalActionsWatcher = function* () {
	yield takeEvery(HandleModalAction, handleModalActionWorker)
}
