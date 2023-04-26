/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
import { useAppSelector } from '@shared/libs'

import { parsingTextSelectors, useParsingTextActions } from '@entities/text'

import styles from './InputText.module.scss'
import { QuestionFeature } from '../../../features/question'
import { ParseTreeWidget } from '../ParseTree'
import { useTreeParserActions } from '@entities/tree'
import { useRef } from 'react'

export const InputTextWidget = () => {
	const text = useAppSelector(parsingTextSelectors.text)
	const { updateText } = useParsingTextActions()

	const textRef = useRef(null)

	const tree = useTreeParserActions()

	const onMouseUp = () => {
		const textVal = textRef.current
		if (textVal) {
			const cursorStart = textVal.selectionStart!
			const cursorEnd = textVal.selectionEnd!
			const selectedText = text.substring(cursorStart, cursorEnd)

			if (selectedText) {
				tree.updateText({
					data: selectedText
				})
			} else {
				tree.updateText({
					data: text
				})
			}
		}
	}

	return (
		<>
			<div className={styles.title}>Текст</div>
			<div className={styles.content}>
				<div className={styles.inputs}>
					<div className={styles.inputText}>
						<textarea
							ref={textRef}
							onSelect={onMouseUp}
							value={text}
							onChange={(e) => updateText({ data: e.target.value })}
							placeholder="Введите текст..."
						/>
					</div>
					<ParseTreeWidget />
				</div>
				<div className={styles.btns}>
					<QuestionFeature>
						<b>Парсинг текста</b> - это процесс разбиения цельного объекта на самостоятельные части.
						<br />
						<br />
						Для парсинга вашего текста в нашей системе введите текст в окно голубого цвета в левой части экрана. Затем нажмите
						кнопку "Спарсить". После нажатия кнопки ваш текст разобьется на отдельные слова, из которых сформируется словарь с
						данными словами. Затем Вы сможете просмотреть информацию о данных словах, а также редактировать ее.
						<br />
						<br />
						Также Вы можете работать с текстом из файла в формате TXT или RTF. Для загрузки данного файла нажмите кнопку
						"Загрузить файл". После этого вы увидите текст в окне. Если это конечный вид текста, нажмите "Спарсить".
					</QuestionFeature>
				</div>
			</div>
		</>
	)
}
