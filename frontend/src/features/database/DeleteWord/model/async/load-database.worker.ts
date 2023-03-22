import { call, put } from 'redux-saga/effects'
import { api } from '@shared/api'
import { DeleteWordAction } from '../../../../../entities/database'

export const deleteWordWorker = function* ({ payload }: { payload: { word: string } }): any {
	try {
		const { word } = payload
		yield call(() => api.database.deleteWord({ word }))

		yield put(DeleteWordAction({ data: word }))
	} catch (e: any) {
		// return yield put(ErrorInLoadingDatabaseWordInfoAction({ message: 'error' }))
	}
}
