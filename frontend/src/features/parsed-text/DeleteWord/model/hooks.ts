import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../../shared/libs'

import { DeleteWordAction } from '@entities/database'

export const useDeleteWordParsedTextActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators({ deleteWord: DeleteWordAction }, dispatch)
}
