import React, { useEffect } from 'react'

import { Button } from '@shared/ui'
import { useAppSelector } from '@shared/libs'

import styles from './ParseText.module.scss'
import { parseDataSelectors, useParseTextActions } from '../model'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@shared/config'

export const ParseTextFeature = () => {
	const { loadParseTextInfo, clearState } = useParseTextActions()
	const navigate = useNavigate()

	const isLoaded = useAppSelector(parseDataSelectors.isLoaded)

	useEffect(() => {
		return () => {
			clearState()
		}
	}, [])

	useEffect(() => {
		if (isLoaded) {
			navigate(appRoutes.parsedText.goto())
		}
	}, [isLoaded])

	return <Button onClick={loadParseTextInfo} className={styles.wrapper} title="Спарсить" />
}
