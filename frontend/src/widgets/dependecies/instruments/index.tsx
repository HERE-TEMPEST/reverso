import { sentenceDataParserSelectors, useSentenceDataParserActions } from '@entities/sentences'
import { parsingTextSelectors, useParsingTextActions } from '@entities/text'
import { useAppSelector } from '@shared/libs'
import { useEffect, useRef, useState } from 'react'
import styles from './Instruments.module.scss'

function applyColors(text: string, colorMap = {} as any) {
	const re = new RegExp(Object.keys(colorMap).join('|'), 'gi')

	return text.replace(re, function (m: string) {
		const c = colorMap[m.toLowerCase()]
		return `<spam style="color:${c}">${m}</spam>`
	})
}

export const InstrumentsWidget = () => {
	const textArea = useRef<any>(null)
	const customArea = useRef<any>(null)
	const backdrop = useRef<any>(null)

	const text = useAppSelector(parsingTextSelectors.text)
	const error = useAppSelector(sentenceDataParserSelectors.error)
	const { updateText } = useParsingTextActions()
	const { parseSentenceData, clearState } = useSentenceDataParserActions()
	const [colorMap, setColorMap] = useState({})

	useEffect(() => {
		if (text) {
			const timeoutId = setTimeout(() => {
				parseSentenceData({ text })
			}, 1000)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [text])

	useEffect(() => {
		customArea.current.innerHTML = text
		textArea.current.value = text
		clearState()
	}, [])

	useEffect(() => {
		if (error) {
			setColorMap({ [` ${error.word} `]: 'red' })
		} else {
			setColorMap({})
		}
	}, [error])

	useEffect(() => {
		customArea.current.innerHTML = applyColors(textArea.current.value, colorMap)
	}, [colorMap])

	const onInput = () => {
		if (textArea.current && customArea.current) {
			backdrop.current.scrollTop = textArea.current.scrollTop
			customArea.current.innerHTML = applyColors(textArea.current.value, colorMap)
			updateText({ data: textArea.current.value })
		}
	}

	const onScroll = () => {
		if (backdrop.current && textArea.current) {
			backdrop.current.scrollTop = textArea.current.scrollTop
		}
	}

	return (
		<div className={styles.inputText}>
			{/* <textarea value={text} onChange={(e) => updateText({ data: e.target.value })} placeholder="Введите текст..." /> */}
			<div ref={backdrop} className={styles.backdrop}>
				<div ref={customArea} className={styles.customArea}></div>
			</div>
			<textarea onScroll={onScroll} onInput={onInput} ref={textArea} className={styles.myTextArea} />
		</div>
	)
}
