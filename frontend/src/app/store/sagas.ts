import { all } from 'redux-saga/effects'

import { databaseSagasWatchers } from '@entities/database'
import { parseDataSagasWatchers } from '@features/parser'
import { saveDatabaseSagasWatchers } from '@features/parsed-text/SaveAllOnDatabase/model'
import { modalSagasWatchers } from '@shared/ui'
import { deleteWordSagasWatchers } from '@features/database/DeleteWord/model'

export const rootWatcher = function* () {
	yield all([
		databaseSagasWatchers.databaseWordAsyncActionsWatcher(),
		parseDataSagasWatchers.parseTextWordAsyncActionsWatcher(),
		saveDatabaseSagasWatchers.saveDatabaseAsyncActionsWatcher(),
		modalSagasWatchers.modalActionsWatcher(),
    deleteWordSagasWatchers.deleteWordAsyncActionsWatcher()
	])
}
