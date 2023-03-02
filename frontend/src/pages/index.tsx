import React from 'react'

import { Routes, Route } from 'react-router-dom'

export const IISAppRouting = () => {
	return (
		<Routes>
			<Route index path={'/'} element={<div>Hello World</div>} />
		</Routes>
	)
}
