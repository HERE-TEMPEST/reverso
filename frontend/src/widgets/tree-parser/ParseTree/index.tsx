/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unescaped-entities */
import { useAppSelector } from '@shared/libs'

import { apiConfig } from '@shared/config'

import { parsingTextSelectors } from '@entities/text'

import styles from './ParseTree.module.scss'
import { useEffect } from 'react'
import { treeParserSelectors, useTreeParserActions } from '@entities/tree'
import classNames from 'classnames'

export const ParseTreeWidget = () => {
	const tempText = useAppSelector(parsingTextSelectors.text)
	const text = useAppSelector(treeParserSelectors.text)
	const tree = useAppSelector(treeParserSelectors.tree)

	const { clearState, parseTree, updateText } = useTreeParserActions()

	useEffect(() => {
		return () => {
			clearState()
		}
	}, [])

	useEffect(() => {
		updateText({ data: tempText })
	}, [tempText])

	useEffect(() => {
		if (text) {
			const timeoutId = setTimeout(() => {
				parseTree({ text })
			}, 1000)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [text])

	return (
		<>
			<div className={styles.treeTitle}>
				<div className={styles.title}>Дерево</div>
				<a
					className={classNames(styles.title, styles.leftTitle)}
					target={'_blank'}
					href={`${apiConfig.backendUri}/${tree.imageUrl}`}
					rel="noreferrer"
				>
					png
				</a>
			</div>
			<div className={styles.tree}>{tree.treeLine}</div>
			<div className={styles.title}>Строка</div>
			<div className={styles.line}>{tree.line}</div>
		</>
	)
}

/*
      S           
      |            
      NP          
  ____|____        
 |         NP     
 |     ____|___    
 |    |        NP 
 |    |        |   
 N    N        N  
 |    |        |   
мама мыла     раму

*/
