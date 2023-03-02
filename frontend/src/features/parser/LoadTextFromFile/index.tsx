import React, { useRef } from 'react'

import { Button } from '@shared/ui'
import { loadFile } from '@shared/helpers'
import { useParsingTextActions } from '@entities/text'

import styles from './LoadTextFromFile.module.scss'

export const LoadTextFromFileFeature = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { updateText } = useParsingTextActions()

	const onSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (file) {
			loadFile(file, (content) => {
				updateText({ data: content })
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
