import { appRoutes } from '@shared/config'

export const menuLinks = [
	{
		label: 'База данных',
		link: appRoutes.database.goto()
	},
	{
		label: 'Парсер',
		link: appRoutes.parser.goto()
	},
	{
		label: 'Парсер деревьев',
		link: appRoutes.parseSentense.goto()
	},
	{
		label: 'Граф предложения',
		link: appRoutes.dependencies.goto()
	},
	{
		label: 'Зависимости слов',
		link: appRoutes.wordDependencies.goto()
	},
	{
		label: 'Определение языка',
		link: appRoutes.languageDetector.goto()
	},
	{
		label: 'Создание конспекта',
		link: appRoutes.notesCreator.goto()
	},
	{
		label: 'Настройки бота',
		link: appRoutes.botSettings.goto()
	},
	{
		label: 'Справочник',
		link: appRoutes.supports.goto()
	}
]
