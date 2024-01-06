import { Fragment, useEffect } from 'react'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import AddCell from '../add-cell/add-cell'
import CellListItem from '../cell-list-item/cell-list-item'

import './cell-list.css'

const CellList = () => {
	const cells = useTypedSelector(({ cells: { data, order } }) =>
		order.map((id) => data[id])
	)
	const { fetchCells } = useActions()

	useEffect(() => {
		fetchCells()
	}, [fetchCells])

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem cell={cell} />
			<AddCell previousCellID={cell.id} />
		</Fragment>
	))

 const addBtnVisibility = cells.length === 0
	
	return (
		<div className='cell-list'>
			<AddCell forceVisible={addBtnVisibility} previousCellID={null} />
			{renderedCells}
		</div>
	)
}

export default CellList
