import { useSearchParams } from 'react-router-dom'
import styles from './Search.module.scss'
import { useEffect, useState } from 'react'
import { apiInstance } from '@shared/api/api-instance'

export const SearchPage = () => {
	const [searchParams] = useSearchParams()
	const [text, setText] = useState(<div>Поиск...</div>)

	useEffect(() => {
		const filename = searchParams.get('filename')

		if (filename) {
			apiInstance
				.get(`/search/downloadfile?file=${filename}`)
				.then((response) => response.data)
				.then((line: string) => {
					const question = searchParams.get('question') || ''
					const index = line.toLowerCase().indexOf(question.toLowerCase())
					const lastIndex = index + question.length

					const start = line.slice(0, index)
					const middle = line.slice(index, lastIndex)
					const end = line.slice(lastIndex)

					console.log({
						start,
						middle,
						end
					})

					setText(
						<div style={{ display: 'flex', gap: '10px' }}>
							<div>{start}</div>
							<div
								style={{
									color: 'yellowgreen'
								}}
							>
								{middle}
							</div>{' '}
							<div>{end}</div>
						</div>
					)
				})
		}
	}, [])

	return <div className={styles.text}>{text}</div>
}
