import { sentenceDataParserSelectors } from '@entities/sentences'
import { useAppSelector } from '@shared/libs'
import { GraphData, GraphWidget } from '@widgets/dependecies/graph'
import { InstrumentsWidget } from '@widgets/dependecies/instruments'
import { useEffect, useState } from 'react'

import styles from './Dependencies.module.scss'

export const DependenciesPage = () => {
	const { graph, nodes } = useAppSelector(sentenceDataParserSelectors.data)

	const [graphData, setGraphData] = useState<GraphData>({ links: [], nodes: [] })

	useEffect(() => {
		const newNodes = [] as Array<any>
		const newEdges = [] as Array<any>

		for (const node of nodes) {
			if (!newNodes.find((n) => n.name === node)) {
				newNodes.push({
					name: node,
					id: node
				})
			}
		}

		for (const edge of graph) {
			if (!Array.isArray(edge.second)) {
				if (!Array.isArray(edge.first)) {
					newEdges.push({
						source: edge.first,
						target: edge.second,
						name: edge.relation
					})
					if (!newNodes.find((n) => n.name === edge.first)) {
						newNodes.push({
							name: edge.first,
							id: edge.first
						})
					}
					if (!newNodes.find((n) => n.name === edge.second)) {
						newNodes.push({
							name: edge.second,
							id: edge.second
						})
					}
				} else {
					if (!newNodes.find((n) => n.name === edge.second)) {
						newNodes.push({
							name: edge.second,
							id: edge.second
						})
					}
					for (const sec of edge.first) {
						newEdges.push({
							source: sec,
							target: edge.second,
							name: edge.relation
						})
						if (!newNodes.find((n) => n.name === sec)) {
							newNodes.push({
								name: sec,
								id: sec
							})
						}
					}
				}
			} else {
				if (!Array.isArray(edge.first)) {
					if (!newNodes.find((n) => n.name === edge.first)) {
						newNodes.push({
							name: edge.first,
							id: edge.first
						})
					}
					for (const sec of edge.second) {
						newEdges.push({
							source: edge.first,
							target: sec,
							name: edge.relation
						})
						if (!newNodes.find((n) => n.name === sec)) {
							newNodes.push({
								name: sec,
								id: sec
							})
						}
					}
				} else {
					console.log('here!!!')
					for (const fir of edge.first) {
						if (!newNodes.find((n) => n.name === fir)) {
							newNodes.push({
								name: fir,
								id: fir
							})
						}
						for (const sec of edge.second) {
							newEdges.push({
								source: fir,
								target: sec,
								name: edge.relation
							})
							if (!newNodes.find((n) => n.name === sec)) {
								newNodes.push({
									name: sec,
									id: sec
								})
							}
						}
					}
				}
			}
		}

		setGraphData((prev) => ({ ...prev, nodes: newNodes, links: newEdges }))
	}, [nodes, graph])

	return (
		<>
			<div className={styles.settingsPanel}>
				<InstrumentsWidget />
			</div>
			<div className={styles.graphSandbox}>
				<GraphWidget height={800} width={1600} data={graphData} />
			</div>
		</>
	)
}
