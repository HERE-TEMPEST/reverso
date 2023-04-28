import { sentenceDataParserSelectors, useSentenceDataParserActions } from '@entities/sentences'
import { useParsingTextActions } from '@entities/text'
import { useAppSelector } from '@shared/libs'
import { useEffect, useState } from 'react'
import styles from './Instruments.module.scss'

export const WordsInstrumentsWidget = () => {
	const [word1, setWord1] = useState('')
	const [word2, setWord2] = useState('')
	const error = useAppSelector(sentenceDataParserSelectors.error)
	const { findHy, clearState } = useSentenceDataParserActions()

	useEffect(() => {
		if (word1 && word2) {
			const timeoutId = setTimeout(() => {
				findHy({ word1, word2 })
			}, 1000)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [word2, word1])

	useEffect(() => {
		clearState()
	}, [])

	useEffect(() => {
		if (error) {
			console.log(error)
		}
	}, [error])

	return (
		<>
			<div className={styles.inputText}>
				<textarea value={word1} onChange={(e) => setWord1(e.target.value)} placeholder="Введите первое слово..." />
			</div>

			<div className={styles.inputText}>
				<textarea value={word2} onChange={(e) => setWord2(e.target.value)} placeholder="Введите второе слово..." />
			</div>
		</>
	)
}
