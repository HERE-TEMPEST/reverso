// import { LoadTextFromFileFeature, ParseTextFeature } from '@features/parser'

import { LoadTextFromFileFeature } from '@features/parser'
import styles from './NotesCreator.module.scss'
import { useState } from 'react'
import { Button } from '@shared/ui'
import { api } from '@shared/api'

export const NotesCreator = () => {
	const [text, updateText] = useState('')
	const [countSentences, setCountSentences] = useState('russian')
	const [extractionAnswer, setExtractionAnswer] = useState('')

	const extractNotes = async () => {
		try {
			const blob = new Blob([text], { type: 'text/plain' })
			const file = new File([blob], 'language.txt', { type: 'text/plain' })

			let info = ''
			try {
				const { key, neuro, sent } = await api.notesExtractor.extract({ file, amountSentences: Number(countSentences) })

				//         key - реферат в виде ключевых слов
				// sent - реферат в виде информативных предложений
				// neuro - реферат, сгенерированный с помощью нейронки - назови его "супер умный реферат")

				info = `Реферат в виде ключевых слов:\n ${key}\n\nРеферат в виде информативных предложений:\n ${sent}\n\nРеферат, сгенерированный с помощью нейросети:\n ${neuro}\n\n`
			} catch (error) {
				info = 'Упс... Что-то пошло не так при формировании конспекта, попробуйте позже...'
			}

			setExtractionAnswer(info)
		} catch {
			//
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>Создание конспекта</div>
			<div className={styles.content}>
				<div className={styles.inputText}>
					<textarea value={text} onChange={(e) => updateText(e.target.value)} placeholder="Введите текст..." />
				</div>
			</div>
			<div className={styles.btns}>
				<LoadTextFromFileFeature updateText={updateText} />
				<Button onClick={extractNotes} className={styles.btn} title="Сформировать конспект" />
				<div className={styles.selector}>
					<input
						value={countSentences}
						onChange={(e) => setCountSentences(e.target.value)}
						className={styles.searchInput}
						placeholder="Введите кол-во предложений в конспекте..."
					/>
				</div>
			</div>
			<div className={styles.inputText} style={{ marginTop: '40px' }}>
				<textarea value={extractionAnswer} placeholder="Результат создания коспекта..." />
			</div>
		</div>
	)
}
