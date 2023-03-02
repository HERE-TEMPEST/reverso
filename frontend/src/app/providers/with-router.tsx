import React from 'react'
import { BrowserRouter } from 'react-router-dom'

export const withRouter = (component: () => React.ReactElement<Node>) => () => {
	return <BrowserRouter>{component()}</BrowserRouter>
}
