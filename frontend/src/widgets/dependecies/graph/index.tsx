import React, { useCallback, useRef } from 'react'
import ForceGraph, { LinkObject, NodeObject } from 'react-force-graph-2d'

export interface GraphData {
	nodes: Array<{
		id: string
		name: string
		node: any
	}>
	links: Array<{
		name: string
		source: string
		target: string
		node: any
	}>
}

interface GraphProps {
	data: GraphData
	height?: number
	width?: number
	onNodeClick?: (node: NodeObject) => void
	onEdgeClick?: (link: LinkObject) => void
	onNodeHover?: (node: NodeObject | null) => void
	onBackgroundClick?: (event: MouseEvent) => void
}

export const GraphWidget: React.FC<GraphProps> = (props: GraphProps) => {
	const { data, onNodeClick, onEdgeClick, onNodeHover, height, width, onBackgroundClick } = props

	const fgRef = useRef<any>(null)

	const onDragNodeHandler = useCallback(
		(node: NodeObject) => {
			node.fx = node.x
			node.fy = node.y
		},
		[fgRef]
	)

	return (
		<ForceGraph
			ref={fgRef}
			height={height}
			width={width}
			graphData={data}
			nodeLabel={'name'}
			onNodeDragEnd={onDragNodeHandler}
			linkLabel={(node: any) => {
				return node.name! || ''
			}}
			linkDirectionalArrowLength={3.5}
			linkDirectionalArrowRelPos={1}
			linkCurvature={0.25}
			linkAutoColorBy="name"
			onNodeHover={onNodeHover}
			onNodeClick={onNodeClick}
			onLinkClick={onEdgeClick}
			onBackgroundClick={onBackgroundClick}
			// nodeCanvasObject={(node: any, ctx: any, globalScale) => {
			// 	const label = node.name
			// 	const fontSize = 12 / globalScale
			// 	ctx.font = `${fontSize}px Sans-Serif`
			// 	const textWidth = ctx.measureText(label as any).width
			// 	const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2) // some padding

			// 	ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
			// 	ctx.fillRect((node.x || 0) - bckgDimensions[0] / 2, (node.y || 0) - bckgDimensions[1] / 2, ...bckgDimensions)

			// 	ctx.textAlign = 'center'
			// 	ctx.textBaseline = 'middle'
			// 	ctx.fillStyle = 'black'
			// 	ctx.fillText(label, node.x, node.y)

			// 	node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
			// }}
			// nodePointerAreaPaint={(node: any, color, ctx: any) => {
			// 	ctx.fillStyle = color
			// 	const bckgDimensions = node.__bckgDimensions
			// 	bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)
			// }}
		/>
	)
}
