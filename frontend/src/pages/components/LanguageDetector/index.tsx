// import { LoadTextFromFileFeature, ParseTextFeature } from '@features/parser'

import { LoadTextFromFileFeature } from '@features/parser'
import styles from './LanguageDetector.module.scss'
import { useState } from 'react'
import { Button } from '@shared/ui'
import { api } from '@shared/api'

export const LanguageDetector = () => {
	const [text, updateText] = useState('')
	const [selectedLanguage, setSelectedLanguage] = useState('russian')
	const [detectionAnswer, setDetectionAnswer] = useState('')

	const detectLanguage = async () => {
		try {
			const blob = new Blob([text], { type: 'text/plain' })
			const file = new File([blob], 'language.txt', { type: 'text/plain' })

			const answer = await api.languageDetector.detect({ file })

			setDetectionAnswer(answer)
		} catch {
			//
		}
	}

	const teachLanguage = async () => {
		try {
			const blob = new Blob([text], { type: 'text/plain' })
			const file = new File([blob], 'language.txt', { type: 'text/plain' })

			await api.languageDetector.learn({ file, language: selectedLanguage })
		} catch {
			//
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Опредление языка</div>
			<div className={styles.content}>
				<div className={styles.inputText}>
					<textarea value={text} onChange={(e) => updateText(e.target.value)} placeholder="Введите текст..." />
				</div>
			</div>
			<div className={styles.btns}>
				<LoadTextFromFileFeature updateText={updateText} />
				<Button onClick={detectLanguage} className={styles.btn} title="Определить язык" />
				<Button onClick={teachLanguage} className={styles.btn} title="Обучить" />
				<div className={styles.selector}>
					<select
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
						className={styles.searchInput}
						placeholder="Выберете язык..."
						defaultValue={selectedLanguage}
					>
						<option key={'russian'} value={'russian'}>
							Russian
						</option>
						<option key={'english'} value={'english'}>
							English
						</option>
					</select>
				</div>
			</div>
			<div className={styles.inputText} style={{ marginTop: '40px' }}>
				<textarea value={detectionAnswer} placeholder="Результат анализа текста..." />
			</div>
		</div>
	)
}
