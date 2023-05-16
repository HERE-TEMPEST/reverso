import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'
import { DeleteWordAction } from '../../../../../entities/database'
import { authSelectors } from '@entities/auth'
import { appSelect } from '@shared/libs'

export const deleteWordWorker = function* ({ payload }: { payload: { word: string } }): any {
	try {
		const { word } = payload

		const userId = yield* appSelect(authSelectors.userId)

		yield call(() => api.database.deleteWord(userId, { word }))

		yield put(DeleteWordAction({ data: word }))
	} catch (e: any) {
		// return yield put(ErrorInLoadingDatabaseWordInfoAction({ message: 'error' }))
	}
}
