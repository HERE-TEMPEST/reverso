/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import classNames from 'classnames'
import { Icon } from '../../../shared/ui'
import styles from './DeleteWord.module.scss'
import { useDeleteWordParsedTextActions } from './model'

export const DeleteWordFeature = ({ className, word }: { className?: string; word: string }) => {
	const { deleteWord } = useDeleteWordParsedTextActions()

	return (
		<div
			className={classNames(styles.wrapper, className)}
			onClick={() => {
				deleteWord({ data: word })
			}}
		>
			<Icon type="delete" />
		</div>
	)
}
