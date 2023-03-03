/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon, Portal } from '@shared/ui'
import { useState } from 'react'

import styles from './AddNewWord.module.scss'
import { CreateProjectModal } from './Modal'

export const AddNewWordFeature = () => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<div className={styles.wrapper} onClick={() => setIsOpen(true)}>
				<Icon type="add" />
			</div>
			{isOpen && <CreateProjectModal onClose={() => setIsOpen(false)} />}
		</>
	)
}
