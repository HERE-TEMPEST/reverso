import React from 'react'

import { withProviders } from './providers'
import { IISAppRouting } from '../pages'

import './styles/index.scss'

const IISApp = () => {
	return <IISAppRouting />
}

export default withProviders(IISApp)
