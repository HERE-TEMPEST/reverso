/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@shared/ui'
import { useState } from 'react'
import styles from './Input.module.scss'

interface InputMessageWidgetProps {
	onSendMessage: (message: string) => void
}

export const InputMessageWidget = (props: InputMessageWidgetProps) => {
	const { onSendMessage } = props

	const [message, setMessage] = useState('')

	return (
		<div className={styles.wrapper}>
			<input value={message} onChange={(e) => setMessage(e.target.value)} className={styles.searchInput} />
			<div onClick={() => (onSendMessage(message), setMessage(''))} className={styles.searchLoupe}>
				<Icon type="send-message" />
			</div>
		</div>
	)
}
