/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { InfoState } from '../model'

import { EditWordModal } from './Modal'

export interface EditWordFeatureProps {
	initialState: InfoState
	onClose: () => void
}

export const EditWordFeature: React.FC<EditWordFeatureProps> = ({ initialState, onClose }: EditWordFeatureProps) => {
	return <EditWordModal initialState={initialState} onClose={onClose} />
}
