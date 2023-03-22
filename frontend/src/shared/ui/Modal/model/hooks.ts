import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../../shared/libs'

import * as asyncActions from './actions/async/handle-action.action'
import * as clearState from './actions/clear-state.action'

export const useModalActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(
		{
			handleModalAction: asyncActions.HandleModalAction,
			clearState: clearState.ClearModalStateAction
		},
		dispatch
	)
}
