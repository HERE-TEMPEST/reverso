import { apiConfig } from '@shared/config'
import { InputMessageWidget } from '@widgets/bot'
import { Message, MessagesBoxWidget } from '@widgets/bot/Messages'
import { useEffect, useRef, useState } from 'react'
import styles from './Bot.module.scss'

export const BotPage = () => {
	const [messages, setMessages] = useState<Array<Message>>([])

	const websocketRef = useRef<WebSocket | null>(null)

	useEffect(() => {
		websocketRef.current = new WebSocket(`ws://${apiConfig.host}:${apiConfig.port}/ws`)

		websocketRef.current.onmessage = (event: MessageEvent<any>) => {
			setMessages((_messages) => [
				..._messages,
				{
					message: event.data,
					who: 'Bot'
				}
			])
		}

		websocketRef.current.onopen = () => {
			console.log('connection opened')
		}
	}, [])

	const onSendMessage = async (message: string) => {
		if (websocketRef.current) {
			await websocketRef.current.send(message)
		}

		setMessages((_messages) => [
			..._messages,
			{
				message,
				who: 'You'
			}
		])
	}

	return (
		<div className={styles.wrapper}>
			<MessagesBoxWidget messages={messages} />
			<InputMessageWidget onSendMessage={onSendMessage} />
		</div>
	)
}
