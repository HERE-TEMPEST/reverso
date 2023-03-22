import classNames from 'classnames'
import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
	title: string
	onClick: () => void
	className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
	const { onClick, title, className, disabled } = props

	return (
		<button className={classNames(styles.wrapper, className)} disabled={disabled} onClick={onClick}>
			{title}
		</button>
	)
}
