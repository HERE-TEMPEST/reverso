/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-key */
import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import { Icon } from '@shared/ui'

import styles from './Messages.module.scss'
import YouAvatar from '../../../../public/person.png'
import BotAvatar from '../../../../public/bx_bot.png'

export interface Message {
	who: 'Bot' | 'You'
	message: string
}

interface MessageWidgetProps {
	message: Message
}

const MessageWidget = (props: MessageWidgetProps) => {
	const { message } = props

	const onSpeechClick = () => {
		window.speechSynthesis.cancel()

		const utterance = new SpeechSynthesisUtterance(message.message)

		const savedValueLine = localStorage.getItem('bot-speech')

		if (savedValueLine) {
			const savedValue = JSON.parse(savedValueLine)

			utterance.voice = window.speechSynthesis.getVoices().find((_voice) => _voice.voiceURI === savedValue.voice)!

			utterance.pitch = savedValue.tonal
			utterance.rate = savedValue.speed
			utterance.volume = savedValue.volume
		}

		utterance.onmark = (event) => {
			console.log(event)
		}
		utterance.onboundary = (event) => {
			console.log(event)
		}

		// utterance.onboundary = (event) => {
		// 	console.log('test')
		// }

		window.speechSynthesis.speak(utterance)
	}

	return (
		<div className={classNames(styles.messageWrapper, message.who === 'You' ? styles.person : '')}>
			{message.who === 'Bot' && (
				<div className={styles.botSpeech} onClick={onSpeechClick}>
					<Icon type="speech" />{' '}
				</div>
			)}
			<div className={styles.avatar}>
				<img src={message.who === 'Bot' ? BotAvatar : YouAvatar} alt="" />
			</div>
			<div className={styles.messageBody}>
				<div className={styles.who}>{message.who}</div>
				<div className={styles.mBody}>
					{message.message.split(' ').map((word) =>
						word.includes('http') ? (
							<a href={word} target="_blank" rel="noreferrer">
								{' '}
								ссылка
							</a>
						) : (
							` ${word}`
						)
					)}
				</div>
			</div>
		</div>
	)
}

interface MessagesBoxWidgetProps {
	messages: Array<Message>
}

export const MessagesBoxWidget: React.FC<MessagesBoxWidgetProps> = (props: MessagesBoxWidgetProps) => {
	const { messages } = props

	const ref = useRef<any>(null)

	useEffect(() => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight
		}
	}, [messages])

	return (
		<div ref={ref} className={styles.wrapper}>
			{messages.map((message, key) => (
				<MessageWidget key={key} message={message} />
			))}
		</div>
	)
}
