import { useEffect } from 'react'

import { databaseSelectors, useDatabaseActions } from '@entities/database'

import { LetterFilterFeature, TitleFilterFeature } from '@features/database'
import { QuestionFeature } from '@features/question'
import { useAppSelector, useResponsive } from '@shared/libs'

import { WordCardWidget } from '../WordCard'

import styles from './Data.module.scss'
import { SaveAllOnDatabaseFeature } from '@features/parsed-text'

export const DataWidget = () => {
	const [result] = useResponsive('MOBILE')

	const database = useAppSelector(databaseSelectors.database)

	const { clearState } = useDatabaseActions()

	useEffect(() => {
		return () => {
			clearState()
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.title}>Полученные значения</div>
				<TitleFilterFeature className={styles.filter} />
			</div>
			<div className={styles.contentDatabase}>
				{!result && <LetterFilterFeature className={styles.alphabetFilter} />}
				<div className={styles.database}>
					{database.length > 0 ? (
						<div className={styles.content}>
							{database.map((word, index) => (
								<WordCardWidget key={index} state={word} />
							))}
						</div>
					) : (
						<div className={styles.emptyData}>Данные не найдены...</div>
					)}
				</div>
				{!result && (
					<div className={styles.btns}>
						<SaveAllOnDatabaseFeature />
						<QuestionFeature />
					</div>
				)}
			</div>
			{result && (
				<div className={styles.features}>
					<LetterFilterFeature className={styles.letterFilterMobileAdaptive} />
					<div className={styles.btns}>
						<SaveAllOnDatabaseFeature />
						<QuestionFeature />
					</div>
				</div>
			)}
		</div>
	)
}
