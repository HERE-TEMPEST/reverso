/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import classNames from 'classnames'
import { Icon } from '../../../shared/ui'
import styles from './DeleteWord.module.scss'
import { useDeleteWordActions } from './model'

export const DeleteWordFeature = ({ className, word }: { className?: string; word: string }) => {
	const { deleteWord } = useDeleteWordActions()

	return (
		<div
			className={classNames(styles.wrapper, className)}
			onClick={() => {
				deleteWord({ word })
			}}
		>
			<Icon type="delete" />
		</div>
	)
}
