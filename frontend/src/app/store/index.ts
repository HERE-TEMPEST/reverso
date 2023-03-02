import { configureStore } from '@reduxjs/toolkit'

import createReduxSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createReduxSagaMiddleware()

import { rootReducer } from './rootReducer'
import { rootWatcher } from './sagas'

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	// devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootWatcher)
