import { useEffect } from 'react'

import { databaseSelectors, useDatabaseActions } from '@entities/database'

import { AddNewWordFeature, LetterFilterFeature, TitleFilterFeature } from '@features/database'
import { QuestionFeature } from '@features/question'
import { useAppSelector, useResponsive } from '@shared/libs'

import { WordCardWidget } from '../WordCard'

import styles from './Data.module.scss'

export const DataWidget = () => {
	const [result] = useResponsive('MOBILE')

	const database = useAppSelector(databaseSelectors.database)
	const isFailed = useAppSelector(databaseSelectors.isFailed)
	const isLoading = useAppSelector(databaseSelectors.isLoading)
	const isLoaded = useAppSelector(databaseSelectors.isLoaded)
	const error = useAppSelector(databaseSelectors.error)

	const { loadDatabaseWordInfo } = useDatabaseActions()

	useEffect(() => {
		if (!isLoaded) {
			loadDatabaseWordInfo()
		}
	}, [])

	useEffect(() => {
		if (!isLoaded) {
			loadDatabaseWordInfo()
		}
	}, [isLoaded])

	useEffect(() => {
		console.log(result)
	}, [result])

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.title}>База данных</div>
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
						<AddNewWordFeature />
						<QuestionFeature />
					</div>
				)}
			</div>
			{result && (
				<div className={styles.features}>
					<LetterFilterFeature className={styles.letterFilterMobileAdaptive} />
					<div className={styles.btns}>
						<AddNewWordFeature />
						<QuestionFeature />
					</div>
				</div>
			)}
		</div>
	)
}
