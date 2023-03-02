/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import ReversoLogo from '@public/images/logo.png'
import { Icon } from '@shared/ui'
import { appRoutes } from '@shared/config'
import { Menu } from '@widgets/menu'

export const Header = () => {
	const [isOpenedburgerMenu, setIsOpenedBurgerMenu] = useState(false)

	return (
		<div className={styles.wrapper}>
			<Link to={appRoutes.base.goto()} className={styles.logo}>
				<img src={ReversoLogo} alt="" />
			</Link>
			<div className={styles.burgerMenuIcon} onClick={() => setIsOpenedBurgerMenu(true)}>
				<Icon type="burger-menu" />
			</div>
			<Menu close={() => setIsOpenedBurgerMenu(false)} isOpened={isOpenedburgerMenu} />
		</div>
	)
}
