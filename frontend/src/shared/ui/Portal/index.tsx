import React from 'react'
import ReactDOM from 'react-dom'

const portal = document.querySelector('#portal')

interface PortalProps {
	children: React.ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
	return ReactDOM.createPortal(children, portal!)
}
