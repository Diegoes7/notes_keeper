import { RootState } from '../reducers'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { addCellDocument, fetchCellsDocument } from '../../firebase/firebaseConfig'

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.FETCH_CELLS })

		try {
			const data = await fetchCellsDocument();

			// Trigger an action with the result of this Firebase call
			dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data })
		} catch (err) {
			if (err instanceof Error) {
				dispatch({
					type: ActionType.FETCH_CELLS_ERROR,
					payload: err.message,
				})
			}
		}
	}
}

export const saveCells = () => {
	return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
		const {
			cells: { order, data },
		} = getState()
		const cells = order.map((id) => data[id]) //! iterate over id[] and on every id get a value in data

		try {
			console.log('Saving cells:', cells)
			// Save data to Firebase Firestore
			await Promise.all(
				cells.map(async (cell) => {
					await addCellDocument(cell);
				})
			)
		} catch (err) {
			if (err instanceof Error) {
				dispatch({
					type: ActionType.SAVE_CELLS_ERROR,
					payload: err.message,
				})
			}
		}
	}
}
