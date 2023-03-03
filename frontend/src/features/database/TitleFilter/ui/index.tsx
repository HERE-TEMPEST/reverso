/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames'
import React from 'react'

import { databaseSelectors, useDatabaseActions } from '@entities/database'
import { useAppSelector } from '@shared/libs'

import styles from './TitleFilter.module.scss'

import { Icon } from '@shared/ui'

interface TitleFilterFeatureProps {
	className?: string
}

export const TitleFilterFeature: React.FC<TitleFilterFeatureProps> = (props: TitleFilterFeatureProps) => {
	const { className } = props

	const filters = useAppSelector(databaseSelectors.filters)

	const { changeDatabaseFilters } = useDatabaseActions()

	return (
		<div className={classNames(styles.wrapper, className)}>
			<input
				value={filters.name}
				onChange={(e) => changeDatabaseFilters({ filters: { name: e.target.value } })}
				className={styles.searchInput}
				placeholder="Искать по имени..."
			/>
			<div className={styles.searchLoupe}>
				<Icon type="loupe" />
			</div>
		</div>
	)
}
