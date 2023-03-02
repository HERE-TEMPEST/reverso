import { Outlet } from 'react-router-dom'

import { Header } from '@widgets/header'

import styles from './MainLayout.module.scss'

export const MainLayout = () => {
	return (
		<article className={styles.wrapper}>
			<Header />
			<section className={styles.wrapperPage}>
				<Outlet />
			</section>
		</article>
	)
}
