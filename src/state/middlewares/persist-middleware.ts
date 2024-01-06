import { Dispatch } from 'redux'
import { Action } from '../actions'
import { ActionType } from '../action-types'
import { saveCells } from '../action-creators'
import { RootState } from '../reducers'

type PersistMiddlewareProps = {
	dispatch: Dispatch<Action>
	getState: () => RootState
}

export const persistMiddleware = ({
	dispatch,
	getState,
}: PersistMiddlewareProps) => {
	let timer: any
	return (next: (action: Action) => void) => {
		return (action: Action) => {
			next(action)
			if (
				[
					ActionType.MOVE_CELL,
					ActionType.DELETE_CELL,
					ActionType.INSERT_CELL_AFTER,
					ActionType.UPDATE_CELL,
				].includes(action.type)
			) {
				if (timer) {
					clearTimeout(timer)
				}
				timer = setTimeout(() => {
					saveCells()(dispatch, getState)
				}, 1500)
			}
		}
	}
}
