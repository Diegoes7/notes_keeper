import { ActionType } from '../action-types'
import { CellDirection, CellType, Cell } from '../cell'

//* All describe an action, what is the type and what is the structure of payload
export interface MoveCellAction {
	type: ActionType.MOVE_CELL
	payload: {
		id: string
		direction: CellDirection
	}
}

export interface DeleteCellAction {
	type: ActionType.DELETE_CELL
	payload: string
}

export interface InsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER
	payload: {
		id: string | null
		type: CellType
	}
}

export interface UpdateCellAction {
	type: ActionType.UPDATE_CELL
	payload: {
		id: string
		content: string //i because cell can be two types
		date: string
	}
}

export interface BundleStartAction {
	type: ActionType.BUNDLE_START
	payload: {
		cellID: string
	}
}

export interface BundleCompleteAction {
	type: ActionType.BUNDLE_COMPLETE
	payload: {
		cellID: string
		bundle: {
			code: string
			err: string
		}
	}
}

export interface FetchCellsAction {
	type: ActionType.FETCH_CELLS
}

export interface FetchCellsCompleteAction {
	type: ActionType.FETCH_CELLS_COMPLETE,
	payload: Cell[]
}

export interface FetchCellsErrorAction {
	type: ActionType.FETCH_CELLS_ERROR,
	payload: string | null
}

export interface SaveCellsErrorAction {
	type: ActionType.SAVE_CELLS_ERROR,
	payload: string
}

export type Action =
	| MoveCellAction
	| DeleteCellAction
	| InsertCellAfterAction
	| UpdateCellAction
	| BundleStartAction
	| BundleCompleteAction
	| FetchCellsAction
	| FetchCellsCompleteAction
	| FetchCellsErrorAction
	| SaveCellsErrorAction
