import { useCallback } from 'react'
import { useActions } from '../../hooks/use-actions'
import './action-bar.css'
import { deleteCellFromBackend } from '../../firebase/firebaseConfig'
import { Cell } from '../../state'

interface ActionBarProps {
	id: string
	style?: React.CSSProperties
	cell: Cell
}

const ActionBar: React.FC<ActionBarProps> = ({ cell }) => {
	const { moveCell, deleteCell } = useActions()

	const removeCell = useCallback(async () => {
		deleteCell(cell.id)
		await deleteCellFromBackend(cell.id)
	}, [deleteCell, cell.id])

	return (
		<div
			className={`action-bar ${cell.type === 'text' && 'reposition-btns'}`}
		>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(cell.id, 'up')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-up'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small'
				onClick={() => moveCell(cell.id, 'down')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-down'></i>
				</span>
			</button>
			<button className='button is-primary is-small' onClick={removeCell}>
				<span className='icon'>
					<i className='fas fa-times'></i>
				</span>
			</button>
		</div>
	)
}

export default ActionBar
