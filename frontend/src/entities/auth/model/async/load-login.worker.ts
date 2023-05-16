import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'

import { ErrorInLoadingAuthInfoAction, LoadingAuthInfoAction, AuthLoadedInfoAction } from '../actions'

export const loadAuthWorker = function* ({ payload }: any): any {
	try {
		const { login, password } = payload

		console.log({ login, password })
		yield put(LoadingAuthInfoAction())

		const data = yield call(() => api.auth.login({ login, password }))

		const { userId } = data as { userId: number }

		yield put(AuthLoadedInfoAction({ userId: userId }))
	} catch (e: any) {
		return yield put(ErrorInLoadingAuthInfoAction({ message: 'Неверный логин или пароль' }))
	}
}
