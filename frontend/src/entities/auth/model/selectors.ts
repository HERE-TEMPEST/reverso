/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */

export const isAuth = (state: RootState) => state.auth.userId !== -1
export const userId = (state: RootState) => state.auth.userId
export const isFailed = (state: RootState) => state.auth.isFailed
export const error = (state: RootState) => state.auth.error
export const isLoaded = (state: RootState) => state.auth.isLoaded
export const isLoading = (state: RootState) => state.auth.isLoading
