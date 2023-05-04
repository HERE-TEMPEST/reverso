import { InputMessageWidget } from '@widgets/bot'
import { Message, MessagesBoxWidget } from '@widgets/bot/Messages'
import { useState } from 'react'
import styles from './Bot.module.scss'

export const BotPage = () => {
	const [messages, setMessages] = useState<Array<Message>>([
		{
			message: 'Привет',
			who: 'Bot'
		}
	])

	const onSendMessage = (message: string) => {
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
