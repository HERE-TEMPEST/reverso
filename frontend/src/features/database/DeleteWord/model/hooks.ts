import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../../shared/libs'

import * as actiontCreators from './actions/load-database.action'

export const useDeleteWordActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators({ deleteWord: actiontCreators.DeleteWordAction }, dispatch)
}
