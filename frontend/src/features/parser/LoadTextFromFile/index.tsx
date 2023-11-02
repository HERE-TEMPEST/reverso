import React, { useRef } from 'react'

import { Button } from '@shared/ui'
import { loadFile } from '@shared/helpers'
import { useParsingTextActions } from '@entities/text'

import styles from './LoadTextFromFile.module.scss'

export const LoadTextFromFileFeature = (params?: { updateText?: (string: string) => void }) => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const parsingTextActions = useParsingTextActions()

	const preUpdate = (content: string) => {
		parsingTextActions.updateText({ data: content })
	}

	const updateText = params?.updateText || preUpdate

	const onSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			loadFile(file, (content) => {
				updateText(content)
			})
		}
	}

	const onClickLoadFromFile = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	return (
		<>
			<input ref={inputRef} onChange={onSelectedFile} type="file" accept=".rtf,.txt" className={styles.file} />
			<Button onClick={onClickLoadFromFile} className={styles.wrapper} title="Загрузить файл" />
		</>
	)
}
