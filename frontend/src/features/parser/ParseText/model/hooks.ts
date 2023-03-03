import { bindActionCreators } from 'redux'

import { useAppDispatch } from '@shared/libs'

import * as actiontCreators from './actions/async'
import { CleaerStateParseTextAction } from './actions'

export const useParseTextActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators({ ...actiontCreators, clearState: CleaerStateParseTextAction }, dispatch)
}
