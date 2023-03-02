import React from 'react'

import { withProviders } from './providers'
import { ReversoAppRouting } from '@pages'

import '@shared/styles/index.scss'

const ReversoApp = () => {
	return <ReversoAppRouting />
}

export default withProviders(ReversoApp)
