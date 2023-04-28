import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import {
	ErrorInParsingSentenceDataFromTextAction,
	ParsedSentenceDataFromTextAction,
	ParsingSentenceDataFromTextAction
} from '../actions'

export const findHyFromTwoWordsWorker = function* ({ payload }: any): any {
	try {
		const { word1, word2 } = payload

		yield put(ParsingSentenceDataFromTextAction())

		const data = yield call(() => api.sentense.findHy({ word1, word2 }))

		yield put(ParsedSentenceDataFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingSentenceDataFromTextAction({ message: e.message, word: e?.config?.data?.word || '' }))
	}
}
