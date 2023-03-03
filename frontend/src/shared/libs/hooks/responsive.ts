import React from 'react'
import _ from 'lodash'

import styles from '@shared/styles/responsive.module.scss'

const CAN_USE_DOM = typeof window !== 'undefined'
const MQ = {
	MOBILE: styles.mobile,
	NO_MOBILE: styles.nomobile,
	DESKTOP: styles.desktop,
	TABLET_P: styles.tabletportrait,
	TABLET_L: styles.tabletlandscape,
	TABLET: styles.tablet
} as const

type Query = keyof typeof MQ

export const useResponsive = (query: Query | Query[]) => {
	const [isInitialRenderPassed, setIsInitialRenderPassed] = React.useState(false)
	const [isQueryMatching, setIsQueryMatching] = React.useState(isMatching(query))
	const result = isInitialRenderPassed ? isQueryMatching : undefined

	const isMatchingQuery = React.useCallback(
		(query: Query | Query[]) => {
			return isInitialRenderPassed && isMatching(query)
		},
		[isInitialRenderPassed]
	)

	const onWindowResize = React.useCallback(() => {
		setIsQueryMatching(isMatching(query))
	}, [query])

	React.useEffect(() => {
		window.addEventListener('resize', onWindowResize)
		return function cleanup() {
			window.removeEventListener('resize', onWindowResize)
		}
	}, [isQueryMatching, onWindowResize])

	React.useEffect(() => {
		setIsInitialRenderPassed(true)
	}, [])

	return [result, isMatchingQuery] as const
}

const isMatching = (query: Query | Query[]) => {
	let array

	if (_.isArray(query)) {
		array = _.map(query, (item) => CAN_USE_DOM && !!window.matchMedia(MQ[item]).matches)
		return array.some((o) => o)
	}

	return CAN_USE_DOM && !!window.matchMedia(MQ[query]).matches
}
