import { IDatabaseWord } from '@entities/database'
import classNames from 'classnames'
import React from 'react'

import styles from './ShortCard.module.scss'

interface WordShortCardProps {
	state: IDatabaseWord
	className?: string
}

export const WordShortCard: React.FC<WordShortCardProps> = (props: WordShortCardProps) => {
	const { state, className } = props

	return <div className={classNames(styles.wrapper, className)}>{state.word}</div>
}
