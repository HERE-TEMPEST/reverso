import { InfoState } from './types'
import { put } from 'redux-saga/effects'

import { AddNewWordAction } from '../../../../entities/database'
import { appSelect } from '@shared/libs'

export const actionHandler = function* (state: InfoState): any {
	yield put(AddNewWordAction({ data: state }))
}
