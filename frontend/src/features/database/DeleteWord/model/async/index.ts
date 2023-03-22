import { takeEvery } from 'redux-saga/effects'

import {  DeleteWordAction } from '../actions/load-database.action'

import { deleteWordWorker } from './load-database.worker'

export const deleteWordAsyncActionsWatcher = function* () {
	yield takeEvery(DeleteWordAction, deleteWordWorker)
}
