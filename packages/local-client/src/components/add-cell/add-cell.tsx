import { useLocation } from 'react-router-dom'
import { useActions } from '../../hooks/use-actions'

import './add-cell.css'
import React from 'react'

interface AddCellProps {
	previousCellID: string | null
	forceVisible?: boolean
}
const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellID }) => {
	const loc = useLocation()
	const { insertCellAfter } = useActions()

	let showCodeButton = loc.pathname === '/code' ? true : false
	let showTextButton = loc.pathname === '/text' ? true : false
	if (loc.pathname === '/') {
		showCodeButton = true
		showTextButton = true
	}

	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className='add-buttons'>
				{showCodeButton && (
					<button
						className='button is-rounded is-primary is-small'
						onClick={() => insertCellAfter(previousCellID, 'code')}
					>
						<span className='icon is-small'>
							<i className='fas fa-plus' />
						</span>
						<span>Code</span>
					</button>
				)}
				{showTextButton && (
					<button
						className='button is-rounded is-primary is-small'
						onClick={() => insertCellAfter(previousCellID, 'text')}
					>
						<span className='icon is-small'>
							<i className='fas fa-plus' />
						</span>
						<span>Text</span>
					</button>
				)}
			</div>
			<div className='divider'></div>
		</div>
	)
}

export default AddCell
