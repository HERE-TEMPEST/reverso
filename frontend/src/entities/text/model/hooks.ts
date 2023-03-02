import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../shared/libs'

import { UpdateTextInfoAction } from './actions'

export const useParsingTextActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators({ updateText: UpdateTextInfoAction }, dispatch)
}
