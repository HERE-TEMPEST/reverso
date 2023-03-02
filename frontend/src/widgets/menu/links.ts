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
		label: 'Справочник',
		link: appRoutes.supports.goto()
	}
]
