import { authSelectors, useAuthActions } from '@entities/auth'
import { useAppSelector } from '@shared/libs'
import { useState } from 'react'
import styles from './Auth.module.scss'

export const AuthPage = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const error = useAppSelector(authSelectors.error)
	const isFailed = useAppSelector(authSelectors.isFailed)

	const { loadAuthInfo } = useAuthActions()

	const onLogin = () => {
		loadAuthInfo({ login, password })
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.inputs}>
				{isFailed && <div>{error}</div>}
				<div className={styles.inputWrapper}>
					<input placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} />
				</div>
				<div className={styles.inputWrapper}>
					<input type={'password'} placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<div className={styles.buttonWrapper}>
					<button onClick={(e) => onLogin()}>Войти</button>
				</div>
				<div className={styles.buttonWrapper}>
					<button onClick={(e) => onLogin()}>Войти через Google</button>
				</div>
			</div>
		</div>
	)
}
