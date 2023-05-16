import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import {
	ErrorInParsingSentenceDataFromTextAction,
	ParsedSentenceDataFromTextAction,
	ParsingSentenceDataFromTextAction
} from '../actions'
import { authSelectors } from '@entities/auth'
import { appSelect } from '@shared/libs'

export const findHyFromTwoWordsWorker = function* ({ payload }: any): any {
	try {
		const userId = yield* appSelect(authSelectors.userId)

		const { word1, word2 } = payload

		yield put(ParsingSentenceDataFromTextAction())

		const data = yield call(() => api.sentense.findHy(userId, { word1, word2 }))

		yield put(ParsedSentenceDataFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingSentenceDataFromTextAction({ message: e.message, word: e?.config?.data?.word || '' }))
	}
}
