import React from 'react'

import { Button } from '@shared/ui'

import styles from './ParseText.module.scss'

export const ParseTextFeature = () => {
	return <Button className={styles.wrapper} title="Спарсить" />
}
