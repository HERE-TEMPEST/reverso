/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { IDatabaseWord } from '@entities/database'
import classNames from 'classnames'
import React from 'react'

import styles from './ShortCard.module.scss'

interface WordShortCardProps {
	state: IDatabaseWord
	className?: string
	onClick?: () => void
}

export const WordShortCard: React.FC<WordShortCardProps> = (props: WordShortCardProps) => {
	const { state, className, onClick } = props

	return (
		<div onClick={onClick} className={classNames(styles.wrapper, className)}>
			{state.word}
		</div>
	)
}
