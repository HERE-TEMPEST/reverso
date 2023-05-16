import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { appSelect } from '@shared/libs'
import { parsingTextSelectors } from '@entities/text'

import { DatabaseWordLoadedInfoAction } from '@entities/database/model/actions/database-loaded.action'

import { ErrorInLoadingParseTextInfoAction, LoadingParseTextInfoAction, ParseTextLoadedInfoAction } from '../actions'
import { authSelectors } from '@entities/auth'

export const loadParseTextWorker = function* (): any {
	try {
		const userId = yield* appSelect(authSelectors.userId)

		yield put(LoadingParseTextInfoAction())

		const text = yield* appSelect(parsingTextSelectors.text)

		const data = yield call(() => api.parseText.parseText(userId, { text }))

		yield put(DatabaseWordLoadedInfoAction({ data }))
		yield put(ParseTextLoadedInfoAction())
	} catch (e: any) {
		return yield put(ErrorInLoadingParseTextInfoAction({ message: 'error' }))
	}
}
