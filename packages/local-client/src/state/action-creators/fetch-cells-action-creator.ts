import axios from 'axios'
import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'
import { RootState } from '../reducers'

type APIProps = {
	data: Cell[]
}

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionType.FETCH_CELLS })

		// stop request, when you are out of reach of the server and fs, simply NOT to see the failed
		if (window.location.href !== 'http://localhost:7777/') {
			return
		}
		
		try {
			// API request to specific endpoint
			const { data }: APIProps = await axios.get('/cells')
			// Trigger an action with the result of this API call
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
			await axios.post('/cells', { cells })
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
