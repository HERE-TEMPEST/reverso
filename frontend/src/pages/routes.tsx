/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRoutes } from 'react-router-dom'

import { appRoutes } from '@shared/config'

import {
	AuthPage,
	BotPage,
	DatabasePage,
	DependenciesPage,
	ParsedTextPage,
	ParserPage,
	SupportsPage,
	TreeParserPage
} from './components'
import { MainLayout } from './layouts'
import { WordDependenciesPage } from './components/WordDependencies'
import { useAppSelector } from '@shared/libs'
import { authSelectors } from '@entities/auth'

export const GenerateRoutes = () => {
	const isAuth = useAppSelector(authSelectors.isAuth)

	if (!isAuth) {
		return useRoutes([
			{
				path: appRoutes.base.path,
				element: <AuthPage />
			}
		])
	}

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
					path: appRoutes.bot.path,
					element: <BotPage />
				},
				{
					path: appRoutes.parseSentense.path,
					element: <TreeParserPage />
				},
				{
					path: appRoutes.database.path,
					element: <DatabasePage />
				},
				{
					path: appRoutes.dependencies.path,
					element: <DependenciesPage />
				},
				{
					path: appRoutes.wordDependencies.path,
					element: <WordDependenciesPage />
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
