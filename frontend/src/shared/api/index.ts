import { database } from './database'
import { parseText } from './parse-text'
import { tree } from './tree'
import { sentense } from './sentence'
import { languageDetector } from './language-detector'
import { notesExtractor } from './notes-extractor'

export const api = {
	database,
	parseText,
	tree,
	sentense,
	languageDetector,
	notesExtractor
}
