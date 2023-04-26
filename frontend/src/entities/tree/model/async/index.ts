import { takeEvery } from 'redux-saga/effects'

import { ParseTreeFromTextAction } from '../actions/async'

import { parseTreeFromTextWorker } from './parse-tree.worker'

export const treeParseAsyncActionsWatcher = function* () {
	yield takeEvery(ParseTreeFromTextAction, parseTreeFromTextWorker)
}
