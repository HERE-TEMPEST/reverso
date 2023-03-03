/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Icon } from '@shared/ui'
import { useSaveDatabaseActions } from './model'

import styles from './SaveAllOnDatabase.module.scss'

export const SaveAllOnDatabaseFeature = () => {
	const { SaveDataOnDatabase } = useSaveDatabaseActions()

	return (
		<div className={styles.wrapper} onClick={() => SaveDataOnDatabase()}>
			<Icon type="save" />
		</div>
	)
}
