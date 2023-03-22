/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */

export const isFailed = (state: RootState) => state.parseText.isFailed
export const error = (state: RootState) => state.parseText.error
export const isLoaded = (state: RootState) => state.parseText.isLoaded
export const isLoading = (state: RootState) => state.parseText.isLoading
