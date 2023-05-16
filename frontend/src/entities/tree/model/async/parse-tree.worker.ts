import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { ErrorInParsingTreeFromTextAction, ParsedTreeFromTextAction, ParsingTreeFromTextAction } from '../actions'
import { appSelect } from '@shared/libs'
import { authSelectors } from '@entities/auth'

export const parseTreeFromTextWorker = function* ({ payload }: any): any {
	try {
		const { text } = payload

		const userId = yield* appSelect(authSelectors.userId)

		yield put(ParsingTreeFromTextAction())

		const data = yield call(() => api.tree.parseText(userId, { line: text }))

		yield put(ParsedTreeFromTextAction({ data }))
	} catch (e: any) {
		return yield put(ErrorInParsingTreeFromTextAction({ message: 'error' }))
	}
}
