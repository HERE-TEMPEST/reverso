/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Portal } from '@shared/ui'
import React, { useCallback, useEffect, useState } from 'react'

import ReversoLogo from '@public/images/logo.png'
import styles from './Menu.module.scss'
import { menuLinks } from '../links'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

interface MenuProps {
	isOpened: boolean
	close: () => void
}

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
	const { close, isOpened } = props

	const [opened, setOpened] = useState(isOpened)

	useEffect(() => {
		if (!isOpened) {
			setTimeout(() => {
				setOpened((value) => false)
			}, 450)
		} else {
			setOpened((value) => true)
		}
	}, [isOpened])

	const onClick = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		setOpened((value) => false)
		close()
	}, [])

	return (
		<Portal>
			<div style={{ display: opened ? 'block' : 'none' }} className={styles.wrapper} onClick={() => close()}>
				<div
					className={classNames(styles.menuWrapper, isOpened ? styles.menuOpened : styles.menuClosed)}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={styles.logo}>
						<img src={ReversoLogo} alt="" />
					</div>
					<div className={styles.grayLine} />
					<div className={styles.links}>
						{menuLinks.map((menuLink, index) => (
							<Link onClick={onClick} to={menuLink.link} className={styles.link} key={index}>
								{menuLink.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</Portal>
	)
}
