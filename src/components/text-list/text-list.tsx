import { Fragment, useEffect } from 'react'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'
import AddCell from '../add-cell/add-cell'
import CellListItem from '../cell-list-item/cell-list-item'

import './text-list.css'

const TextList = () => {
	const cells = useTypedSelector(({ cells: { data, order } }) =>
		order.map((id) => data[id])
	)
	const { fetchCells } = useActions()

	useEffect(() => {
		fetchCells()
	}, [fetchCells])

	const renderedCells = cells
		.filter((cell) => cell.type !== 'code')
		.map((cell) => (
			<Fragment key={cell.id}>
				<CellListItem cell={cell} />
				<AddCell previousCellID={cell.id} />
			</Fragment>
		))

	const textBtnShow = renderedCells.length === 0

	return (
		<div className='text-list'>
			<AddCell forceVisible={textBtnShow} previousCellID={null} />
			{renderedCells}
		</div>
	)
}

export default TextList
