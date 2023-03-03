import { InfoState } from './types'
import { call, put } from 'redux-saga/effects'

// import { serverApi } from '../../../../shared/api'
// import { NewProjectCreatedAction } from '../../../../entities/projects'

export const actionHandler = function* (state: InfoState, meta: { token: string }): any {
	// const { token } = meta
	// const newProject = yield call(() => serverApi.projects.cr
	// eateProject({ payload: state, token }))
	// yield put(NewProjectCreatedAction({ data: { ...state, ...newProject } }))
}
