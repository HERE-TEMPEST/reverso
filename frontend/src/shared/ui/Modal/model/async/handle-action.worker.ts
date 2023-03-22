import { put } from 'redux-saga/effects'

import { ComplitingModalHandlerAction, ErrorInComplitingModalHandlerAction, ModalHandlerComplitedAction } from '../actions'

interface HandleModalActionWorkerProps {
	payload: {
		handler: (state: any) => Generator
		state: any
	}
}

export const handleModalActionWorker = function* ({ payload }: HandleModalActionWorkerProps): any {
	try {
		const { state, handler } = payload

		yield put(ComplitingModalHandlerAction())

		yield* handler(state)

		yield put(ModalHandlerComplitedAction())
	} catch (e: any) {
		return yield put(ErrorInComplitingModalHandlerAction({ message: 'error' }))
	}
}
