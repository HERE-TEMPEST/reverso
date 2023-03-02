/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { select } from 'redux-saga/effects'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export function* appSelect<TSelected>(selector: (state: RootState) => TSelected): Generator<any, TSelected, TSelected> {
	return yield select(selector)
}
