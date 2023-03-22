import React, { useState } from 'react'

import { IDatabaseWord, WordShortCard } from '@entities/database'

import styles from './WordCard.module.scss'
import { EditWordFeature } from '../../../features/parsed-text/EditWord'
import { DeleteWordFeature } from '../../../features/parsed-text/DeleteWord'

interface WordCardWidgetProps {
	state: IDatabaseWord
}

export const WordCardWidget: React.FC<WordCardWidgetProps> = (props: WordCardWidgetProps) => {
	const { state } = props

	const [onEditState, setOnEdit] = useState(false)

	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<WordShortCard onClick={() => setOnEdit(true)} className={styles.word} state={state} />
				<div className={styles.wordAmount}>{state.amount}</div>
				<DeleteWordFeature word={state.word} className={styles.bin} />
			</div>
			<div className={styles.grayLine} />
			{onEditState && <EditWordFeature initialState={state} onClose={() => setOnEdit(false)} />}
		</div>
	)
}
