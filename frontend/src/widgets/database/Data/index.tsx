import { useAppSelector } from '@shared/libs'

import { parsingTextSelectors, useParsingTextActions } from '@entities/text'
import { LoadTextFromFileFeature, ParseTextFeature } from '@features/parser'

import styles from './Data.module.scss'

export const DataWidget = () => {
	return (
		<>
			<div className={styles.title}>База данных</div>
			<div className={styles.inputText}></div>
		</>
	)
}
