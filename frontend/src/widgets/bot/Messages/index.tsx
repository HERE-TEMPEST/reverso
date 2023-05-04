import React, { useEffect, useRef } from 'react'
import styles from './Messages.module.scss'

import YouAvatar from '../../../../public/person.png'
import BotAvatar from '../../../../public/bx_bot.png'
import classNames from 'classnames'

export interface Message {
	who: 'Bot' | 'You'
	message: string
}

interface MessageWidgetProps {
	message: Message
}

const MessageWidget = (props: MessageWidgetProps) => {
	const { message } = props
	return (
		<div className={classNames(styles.messageWrapper, message.who === 'You' ? styles.person : '')}>
			<div className={styles.avatar}>
				<img src={message.who === 'Bot' ? BotAvatar : YouAvatar} alt="" />
			</div>
			<div className={styles.messageBody}>
				<div className={styles.who}>{message.who}</div>
				<div className={styles.mBody}>{message.message}</div>
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
