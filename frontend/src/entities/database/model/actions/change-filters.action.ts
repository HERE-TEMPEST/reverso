import { createAction, DeepPartial } from '@reduxjs/toolkit'

import { DatabaseWordActionsTokens, DatabaseFilters } from '../database-word.types'

interface DatabaseChangeFiltersActionPayload {
	filters: DeepPartial<DatabaseFilters>
}

export const ChangeDatabaseFiltersAction = createAction<
	DatabaseChangeFiltersActionPayload,
	DatabaseWordActionsTokens.CHANGE_DATABASE_FILTERS_ACTION
>(DatabaseWordActionsTokens.CHANGE_DATABASE_FILTERS_ACTION)
