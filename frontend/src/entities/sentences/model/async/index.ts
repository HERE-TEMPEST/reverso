import { takeEvery } from 'redux-saga/effects'

import { ParseSentenceDataFromTextAction, FindHyFromTwoWordsAction } from '../actions/async'
import { findHyFromTwoWordsWorker } from './find-hy.worker'

import { parseSentenceDataFromTextWorker } from './parse-sentence.worker'

export const sentenceDataParseAsyncActionsWatcher = function* () {
	yield takeEvery(ParseSentenceDataFromTextAction, parseSentenceDataFromTextWorker)
	yield takeEvery(FindHyFromTwoWordsAction, findHyFromTwoWordsWorker)
}
