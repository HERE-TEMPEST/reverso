import { bindActionCreators } from 'redux'

import { useAppDispatch } from '../../../shared/libs'

import { ClearStateAction, ParseSentenceDataFromTextAction, FindHyFromTwoWordsAction } from './actions'

export const useSentenceDataParserActions = () => {
	const dispatch = useAppDispatch()

	return bindActionCreators(
		{ parseSentenceData: ParseSentenceDataFromTextAction, clearState: ClearStateAction, findHy: FindHyFromTwoWordsAction },
		dispatch
	)
}
