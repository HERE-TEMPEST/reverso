import classNames from 'classnames'
import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	title: string
	onClick: () => void
	className?: string
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	const { onClick, title, className } = props

	return (
		<button className={classNames(styles.wrapper, className)} onClick={onClick}>
			{title}
		</button>
	)
}
