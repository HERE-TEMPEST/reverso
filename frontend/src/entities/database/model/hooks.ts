import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../shared/libs'

import * as actiontCreators from './actions/async'
import { ChangeDatabaseFiltersAction, ChangeStateDatabaseAction } from './actions'

export const useDatabaseActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(
		{ ...actiontCreators, changeDatabaseFilters: ChangeDatabaseFiltersAction, clearState: ChangeStateDatabaseAction },
		dispatch
	)
}
