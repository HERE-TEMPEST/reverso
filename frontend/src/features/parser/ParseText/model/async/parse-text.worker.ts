import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { appSelect } from '@shared/libs'
import { parsingTextSelectors } from '@entities/text'

import { DatabaseWordLoadedInfoAction } from '@entities/database/model/actions/database-loaded.action'

import { ErrorInLoadingParseTextInfoAction, LoadingParseTextInfoAction, ParseTextLoadedInfoAction } from '../actions'

export const loadParseTextWorker = function* (): any {
	try {
		yield put(LoadingParseTextInfoAction())

		const text = yield* appSelect(parsingTextSelectors.text)

		const data = yield call(() => api.parseText.parseText({ text }))

		yield put(DatabaseWordLoadedInfoAction({ data }))
		yield put(ParseTextLoadedInfoAction())
	} catch (e: any) {
		return yield put(ErrorInLoadingParseTextInfoAction({ message: 'error' }))
	}
}
