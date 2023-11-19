import { ActionType } from '../action-types'
import {
	UpdateCellAction,
	MoveCellAction,
	DeleteCellAction,
	InsertCellAfterAction,
} from '../actions'
import { CellDirection, CellType } from '../cell'

export const updateCell = (id: string, content: string, date: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: {
			id,
			content,
			date,
		},
	}
}

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	}
}

export const moveCell = (
	id: string,
	direction: CellDirection
): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id,
			direction,
		},
	}
}

export const insertCellAfter = (
	id: string | null,
	type: CellType
): InsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id,
			type,
		},
	}
}

// In these functions are defined the actions and pass the necessary data to the reducers
