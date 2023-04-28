import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import {
	ErrorInParsingSentenceDataFromTextAction,
	ParsedSentenceDataFromTextAction,
	ParsingSentenceDataFromTextAction
} from '../actions'

export const parseSentenceDataFromTextWorker = function* ({ payload }: any): any {
	try {
		const { text } = payload

		yield put(ParsingSentenceDataFromTextAction())

		const data = yield call(() => api.sentense.parseSentense({ line: text }))

		yield put(ParsedSentenceDataFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingSentenceDataFromTextAction({ message: e.message, word: e?.config?.data?.word || '' }))
	}
}
