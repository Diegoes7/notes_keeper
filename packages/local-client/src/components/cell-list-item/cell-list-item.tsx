import { Cell } from '../../state'
import CodeCell from '../code-cell/code-cell'
import TextEditor from '../text-editor/text-editor'
import ActionBar from '../action-bar/action-bar'

import './cell-list-item.css'

interface CellListItemProp {
	cell: Cell
}

const CellListItem: React.FC<CellListItemProp> = ({ cell }) => {
	let child: JSX.Element
	if (cell.type === 'code') {
		child = (
			<>
				<div className='action-bar-wrapper'>
					<ActionBar id={cell.id} />
				</div>
				<CodeCell cell={cell} />
				<DateInfoField date={cell.date} />
			</>
		)
	} else {
		child = (
			<>
				<TextEditor cell={cell} />
				<ActionBar id={cell.id} />
				<DateInfoField date={cell.date} />
			</>
		)
	}
	return <div className='cell-list-item'>{child}</div>
}

export default CellListItem

const DateInfoField: React.FC<{ date: string }> = ({ date }) => {
	return <div className='date-info-field'>{date}.</div>
}
