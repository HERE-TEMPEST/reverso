import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { ErrorInParsingTreeFromTextAction, ParsedTreeFromTextAction, ParsingTreeFromTextAction } from '../actions'

export const parseTreeFromTextWorker = function* ({ payload }: any): any {
	try {
		const { text } = payload

		yield put(ParsingTreeFromTextAction())

		const data = yield call(() => api.tree.parseText({ line: text }))

		yield put(ParsedTreeFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingTreeFromTextAction({ message: 'error' }))
	}
}
