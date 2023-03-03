/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React from 'react'

import { databaseSelectors, useDatabaseActions } from '@entities/database'

import styles from './LetterFilter.module.scss'
import { useAppSelector } from '../../../../shared/libs'

interface LetterFilterFeatureProps {
	className?: string
}

export const LetterFilterFeature: React.FC<LetterFilterFeatureProps> = (props: LetterFilterFeatureProps) => {
	const { className } = props

	const filters = useAppSelector(databaseSelectors.filters)

	const { changeDatabaseFilters } = useDatabaseActions()

	return (
		<div className={classNames(styles.wrapper, className)}>
			{'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'.split('').map((letter) => (
				<div
					className={classNames(styles.letter, filters.letter === letter ? styles.active : '')}
					key={letter}
					onClick={() =>
						changeDatabaseFilters({
							filters: {
								letter: filters.letter === letter ? '' : letter
							}
						})
					}
				>
					{letter}
				</div>
			))}
		</div>
	)
}
