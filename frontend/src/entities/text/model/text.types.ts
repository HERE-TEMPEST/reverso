import { IDatabaseWord } from '@entities/database'

export interface TextState {
	data: string
	words: Array<IDatabaseWord>
}

export enum TextActionsTokens {
	UPDATE_TEXT_ACTION = 'UPDATE_TEXT_ACTION'
}
