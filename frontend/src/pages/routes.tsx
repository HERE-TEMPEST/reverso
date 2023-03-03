import { useRoutes } from 'react-router-dom'

import { appRoutes } from '@shared/config'

import { DatabasePage, ParsedTextPage, ParserPage, SupportsPage } from './components'
import { MainLayout } from './layouts'

export const GenerateRoutes = () => {
	return useRoutes([
		{
			path: appRoutes.base.path,
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <ParserPage />
				},
				{
					path: appRoutes.database.path,
					element: <DatabasePage />
				},
				{
					path: appRoutes.supports.path,
					element: <SupportsPage />
				},
				{
					path: appRoutes.parsedText.path,
					element: <ParsedTextPage />
				}
			]
		}
	])
}
