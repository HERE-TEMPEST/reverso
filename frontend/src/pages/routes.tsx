import { useRoutes } from 'react-router-dom'

import { appRoutes } from '@shared/config'

import {
	BotPage,
	DatabasePage,
	DependenciesPage,
	LanguageDetector,
	NotesCreator,
	ParsedTextPage,
	ParserPage,
	SupportsPage,
	TreeParserPage
} from './components'
import { MainLayout } from './layouts'
import { WordDependenciesPage } from './components/WordDependencies'
import { SearchPage } from './components/Search'

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
					path: appRoutes.bot.path,
					element: <BotPage />
				},
				{
					path: appRoutes.languageDetector.path,
					element: <LanguageDetector />
				},
				{
					path: appRoutes.notesCreator.path,
					element: <NotesCreator />
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
					path: appRoutes.search.path,
					element: <SearchPage />
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
