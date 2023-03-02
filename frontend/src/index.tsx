import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

const ReversoApp = React.lazy(() => import('./app'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<Suspense fallback={<div />}>
			<ReversoApp />
		</Suspense>
	</React.StrictMode>
)
