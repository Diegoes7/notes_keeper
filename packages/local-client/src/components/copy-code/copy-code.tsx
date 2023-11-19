import React, { useRef } from 'react'
import './copy-code.css'

export type Props = {
	text: string
	info: string
	additionalInfo?: string
}

const CopyCode: React.FC<Props> = ({ text, info, additionalInfo }) => {
	const codeRef = useRef<HTMLElement>(null)

	const handleCopyClick = () => {
		if (codeRef.current) {
			const code = codeRef.current.innerText
			navigator.clipboard.writeText(code)
			alert('Code copied to clipboard!')
		}
	}

	return (
		<div className='code-container'>
			<h2>{info}</h2>
			<pre className='pre-styles'>
				<code className='code' ref={codeRef}>
					{text}
				</code>
				<button className='code-button' onClick={handleCopyClick}>
					Copy
				</button>
			</pre>
			<h1>{additionalInfo}</h1>
		</div>
	)
}

export default CopyCode
