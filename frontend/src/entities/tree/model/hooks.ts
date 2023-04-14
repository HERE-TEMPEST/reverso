import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../shared/libs'

import { ClearStateAction, ParseTreeFromTextAction, UpdateTextInfoAction } from './actions'

export const useTreeParserActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(
		{ updateText: UpdateTextInfoAction, parseTree: ParseTreeFromTextAction, clearState: ClearStateAction },
		dispatch
	)
}
