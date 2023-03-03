import React from 'react'

import { IDatabaseWord, WordShortCard } from '@entities/database'

import styles from './WordCard.module.scss'

interface WordCardWidgetProps {
	state: IDatabaseWord
}

export const WordCardWidget: React.FC<WordCardWidgetProps> = (props: WordCardWidgetProps) => {
	const { state } = props

	return (
		<div className={styles.wrapper}>
			<WordShortCard className={styles.word} state={state} />
			<div className={styles.grayLine} />
		</div>
	)
}
