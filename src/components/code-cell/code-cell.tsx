import { useEffect } from 'react'
import CodeEditor from '../code-editor/code-editor'
import Preview from '../preview/preview'
import Resizable from '../resizable/resizable'
import { Cell } from '../../state'
import { useActions } from '../../hooks/use-actions'
import { useTypedSelector } from '../../hooks/use-typed-selector'

import './code-cell.css'
import { useCumulativeCode } from '../../hooks/use-cumulative-code'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content, date } }) => {
	const { updateCell, createBundle } = useActions()
	const bundle = useTypedSelector((state) => state.bundles[id])
	const cumulativeCode = useCumulativeCode(id)

	useEffect(() => {
		if (!bundle) {
			createBundle(id, cumulativeCode)
			return
		}

		const timer = setTimeout(async () => {
			createBundle(id, cumulativeCode)
		}, 1000)
		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, createBundle, id])

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 0.7rem)',
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
				}}
			>
				<Resizable direction='horizontal'>
						<CodeEditor
							initialValue={content}
							onChange={(value) => updateCell(id, value, date)}
						/>
				</Resizable>
				<div className='progress-wrapper'>
					{!bundle || bundle.loading ? (
						<div className='progress-cover'>
							<progress className='progress is-small is-primary' max='100'>
								Loading
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} err={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	)
}

export default CodeCell
