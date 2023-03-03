import { Icon } from '@shared/ui'

import styles from './Question.module.scss'

export const QuestionFeature = () => {
	return (
		<div className={styles.wrapper}>
			<Icon type="question" />
		</div>
	)
}
