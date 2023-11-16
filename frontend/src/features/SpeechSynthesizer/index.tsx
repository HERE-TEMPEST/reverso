/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from 'react'

import styles from './Microphone.module.scss'
import { Icon } from '@shared/ui'

interface SpeechSynthesizerFeatureProps {
	onChange: React.Dispatch<React.SetStateAction<string>>
}

export const SpeechSynthesizerFeature: React.FC<SpeechSynthesizerFeatureProps> = memo((props) => {
	const microphone = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition() : {}

	let speechRecognitionIsOn = false

	const onStartClick = () => {
		props.onChange('')

		speechRecognitionIsOn = true
		microphone?.start()
	}

	const onEndClick = () => {
		speechRecognitionIsOn = false
		microphone?.stop()
	}

	microphone.onstart = () => {
		// clears content (optional)
	}

	microphone.onend = () => {
		if (speechRecognitionIsOn) {
			microphone.start()
		}
	}

	microphone.onerror = () => {
		// todo something
	}

	microphone.onresult = (event: any) => {
		const current = event.resultIndex

		const { transcript } = event.results[current][0]

		props.onChange((currentValue) => currentValue + transcript)
	}

	return (
		<div className={styles.wrapper} onMouseDown={onStartClick} onMouseUp={onEndClick} onClick={() => true}>
			<Icon type="microphone" />
		</div>
	)
})
