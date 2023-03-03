import { call, put } from 'redux-saga/effects'

import { appSelect } from '../../../../libs'

import { ComplitingModalHandlerAction, ErrorInComplitingModalHandlerAction, ModalHandlerComplitedAction } from '../actions'

interface HandleModalActionWorkerProps {
	payload: {
		handler: (state: any, meta: { token: string }) => Generator
		state: any
	}
}

export const handleModalActionWorker = function* ({ payload }: HandleModalActionWorkerProps): any {
	try {
		const { state, handler } = payload

		yield put(ComplitingModalHandlerAction())

		const token = yield* appSelect((state) => state.auth.data?.accessToken)

		yield* handler(state, { token: token! })

		yield put(ModalHandlerComplitedAction())
	} catch (e: any) {
		return yield put(ErrorInComplitingModalHandlerAction({ message: 'error' }))
	}
}
