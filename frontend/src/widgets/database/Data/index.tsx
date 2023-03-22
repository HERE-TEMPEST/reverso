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
						<QuestionFeature>
							<b>База данных</b> в нашем сервисе является своего рода морфологическим словарём, в котором вы можете собирать и
							редактировать информацию о морфологических признаках слов русского языка.
							<br />
							<br />
							Вы можете <b>добавлять</b> слова не только из текстов, но и напрямую в базе данных. Нажмите на значок "+" в
							правом нижнем углу экрана и введите требуемую информацию о слове, которое хотите добавить.
							<br />
							<br />
							Для удобного <b>поиска</b> слов в сервисе представлена навигация по алфавиту (выбор необходимой буквы слева от
							самого словаря), а также поисковая строка, если Вы точно знаете, какое слово хотите найти.
							<br />
							<br />В базе данных Вы можете выбрать слово и <b>отредактировать</b> его морфологические признаки, если считаете
							их неверными. Для этого необходимо нажать на выбранное слово и затем по нажатию на выпадаюшие списки в
							характеристике изменять признаки.
							<br />
							<br />
							Также можно <b>удалять</b> лишние слова из базы. Для этого нажмите на значок корзины рядом с выбранным для
							удаления словом.
						</QuestionFeature>
					</div>
				)}
			</div>
			<div className={styles.amountWords}>Всего слов: {database.length}</div>
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
