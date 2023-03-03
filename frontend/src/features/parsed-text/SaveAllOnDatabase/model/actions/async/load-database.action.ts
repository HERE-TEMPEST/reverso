import { createAction } from '@reduxjs/toolkit'
import { SaveDataOnDatabaseTokens } from '../../save-database.types'

type SaveDataOnDatabasePayload = undefined

export const SaveDataOnDatabase = createAction<
	SaveDataOnDatabasePayload,
	SaveDataOnDatabaseTokens.ASYNC_LOAD_SAVE_DATABASE_INFO_ACTION
>(SaveDataOnDatabaseTokens.ASYNC_LOAD_SAVE_DATABASE_INFO_ACTION)
