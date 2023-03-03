/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-undef */

export const isFailed = (state: RootState) => state.modal.isFailed
export const error = (state: RootState) => state.modal.error
export const isLoaded = (state: RootState) => state.modal.isLoaded
export const isLoading = (state: RootState) => state.modal.isLoading
