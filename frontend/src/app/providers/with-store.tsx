import React from 'react'

import { Provider } from 'react-redux'
import { store } from '../store'

export const withStore = (component: () => React.ReactElement<Node>) => () => {
	return <Provider store={store}>{component()}</Provider>
}
