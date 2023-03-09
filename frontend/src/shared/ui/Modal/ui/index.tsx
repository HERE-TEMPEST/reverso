/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react'
import { AnySchema } from 'yup'
import classNames from 'classnames'

import { useAppSelector } from '../../../libs'
import { Button } from '../../Button'
import { Loader } from '../../Loader'

import { Portal } from '../../Portal'
import { modalSelectors, useModalActions } from '../model'

import styles from './Modal.module.scss'
import { useLogic } from './useLogic'

interface ModalProps<IState, NavTypes> {
	handler: (state: IState, meta: { token: string }) => Generator
	close: () => void
	initialState: Required<IState>
	children: (props: {
		type: NavTypes
		state: IState
		errors: Record<keyof IState, string | undefined> | null
		changeState: (state: Partial<IState>) => void
	}) => any
	validationSchema: AnySchema
	navTypes?: Array<{
		type: NavTypes
		label: string
	}>
	submitButtonTitle: string
	className?: string
}

export const Modal = function <IState, NavTypes>(props: ModalProps<IState, NavTypes>) {
	const { close, children, navTypes, submitButtonTitle, initialState, validationSchema, handler, className } = props

	const [selectedType, setSelectedType] = useState<NavTypes>((navTypes && navTypes[0]?.type) || ('' as any))
	const { changeState, errors, isValid, state } = useLogic({ initialState, schema: validationSchema })

	const { clearState, handleModalAction } = useModalActions()
	const isUpdating = useAppSelector(modalSelectors.isLoading)
	const isUpdated = useAppSelector(modalSelectors.isLoaded)
	const isFailed = useAppSelector(modalSelectors.isFailed)

	useEffect(() => {
		return () => {
			clearState()
		}
	}, [])

	const onUpdateHandler = () => {
		handleModalAction({ state, handler })
	}

	return (
		<Portal>
			<div className={styles.modal} onClick={() => close()}>
				<div className={classNames(styles.modalWrapper, className)} onClick={(e) => e.stopPropagation()}>
					{navTypes && navTypes.length > 0 && (
						<nav className={styles.navBar}>
							{navTypes.map((item, index) => (
								<div
									className={classNames(styles.btn, selectedType === item.type ? styles.active : '')}
									key={index}
									onClick={() => setSelectedType(item.type)}
								>
									{item.label}
								</div>
							))}
							<div className={styles.whiteZone}></div>
						</nav>
					)}
					<section className={styles.contentWrapper}>
						{children({
							state: state,
							type: selectedType,
							changeState: changeState,
							errors: errors
						})}

						<div className={styles.additional}>
							{isUpdated ? (
								<div className={classNames(styles.statusUpdating, isFailed ? styles.failure : styles.success)}>
									{isFailed ? 'Ошибка при выполнении операции...' : 'Операция выполнена успешно...'}
								</div>
							) : (
								<div></div>
							)}
							<div className={styles.btns}>
								<Button className={styles.whiteButton} title="Отмена" onClick={close} />
								<Button
									className={classNames(styles.btn, isValid ? '' : styles.disabled)}
									title={submitButtonTitle}
									disabled={!isValid}
									onClick={onUpdateHandler}
								/>
							</div>
						</div>
					</section>
				</div>
				{isUpdating && (
					<Portal>
						<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
							<div className={styles.loader}>
								<Loader />
							</div>
						</div>
					</Portal>
				)}
			</div>
		</Portal>
	)
}
