import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import {
	ErrorInParsingSentenceDataFromTextAction,
	ParsedSentenceDataFromTextAction,
	ParsingSentenceDataFromTextAction
} from '../actions'
import { authSelectors } from '@entities/auth'
import { appSelect } from '@shared/libs'

export const parseSentenceDataFromTextWorker = function* ({ payload }: any): any {
	try {
		const { text } = payload

		const userId = yield* appSelect(authSelectors.userId)

		yield put(ParsingSentenceDataFromTextAction())

		const data = yield call(() => api.sentense.parseSentense(userId, { line: text }))

		yield put(ParsedSentenceDataFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingSentenceDataFromTextAction({ message: e.message, word: e?.config?.data?.word || '' }))
	}
}
