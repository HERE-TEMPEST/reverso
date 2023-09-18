import { apiConfig } from '@shared/config'
import { InputMessageWidget } from '@widgets/bot'
import { Message, MessagesBoxWidget } from '@widgets/bot/Messages'
import { useEffect, useRef, useState } from 'react'
import styles from './Bot.module.scss'

export const BotPage = () => {
	const [messages, setMessages] = useState<Array<Message>>([])

	const websocketRef = useRef<WebSocket | null>(null)

	useEffect(() => {
		const connectAndListen = () => {
			if (!websocketRef.current || (websocketRef.current && websocketRef.current.readyState !== WebSocket.OPEN)) {
				websocketRef.current = new WebSocket(`ws://${apiConfig.host}:${apiConfig.port}/ws`)

				websocketRef.current.onmessage = async (event: MessageEvent<any>) => {
					await new Promise((r) => setTimeout(r, 1000))

					let message: string = event.data

					if (message.startsWith('#')) {
						message = message.replace('#', '')
						const [filesLine, question] = message.split('*')
						const filesNames = filesLine.split(' ')

						console.log(filesLine, filesNames)

						message =
							'Вот, что я нашел:\n' +
							filesNames
								.map(
									(filename, index) =>
										`${index + 1}: http://localhost:3001/search/?filename=${filename}&question=${encodeURI(question)} `
								)
								.join('\n')
					}

					setMessages((_messages) => [
						..._messages,
						{
							message,
							who: 'Bot'
						}
					])
				}

				websocketRef.current.onopen = () => {
					console.log('connection opened')
				}
			}
		}

		const timeoutId = setInterval(connectAndListen, 500)

		return () => {
			clearInterval(timeoutId)
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
