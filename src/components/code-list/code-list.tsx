import { Fragment, useEffect } from 'react'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import AddCell from '../add-cell/add-cell'
import CellListItem from '../cell-list-item/cell-list-item'

import './code-list.css'

const CodeList = () => {
	const cells = useTypedSelector(({ cells: { data, order } }) =>
		order.map((id) => data[id])
	)
	const { fetchCells } = useActions()

	useEffect(() => {
		fetchCells()
	}, [fetchCells])

	const renderedCells = cells
		.filter((cell) => cell.type !== 'text')
		.map((cell) => (
			<Fragment key={cell.id}>
				<CellListItem cell={cell} />
				<AddCell previousCellID={cell.id} />
			</Fragment>
		))

	const codeBtnShow = renderedCells.length === 0

	return (
		<div className='code-list'>
			<AddCell forceVisible={codeBtnShow} previousCellID={null} />
			{renderedCells}
		</div>
	)
}

export default CodeList
