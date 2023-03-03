/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */

export const database = (state: RootState) => state.database.data
export const filters = (state: RootState) => state.database.filters
export const isFailed = (state: RootState) => state.database.isFailed
export const error = (state: RootState) => state.database.error
export const isLoaded = (state: RootState) => state.database.isLoaded
export const isLoading = (state: RootState) => state.database.isLoading
