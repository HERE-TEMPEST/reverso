import { all } from 'redux-saga/effects'

import { databaseSagasWatchers } from '@entities/database'

export const rootWatcher = function* () {
	yield all([databaseSagasWatchers.databaseWordAsyncActionsWatcher()])
}
