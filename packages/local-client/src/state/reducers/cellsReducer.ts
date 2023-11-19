import { produce } from 'immer'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellsState {
	loading: boolean
	error: string | null
	order: string[]
	data: {
		// keys are ids of individual cells and values are cells themselves
		[key: string]: Cell //* object /{}/ that contain three different props
	}
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
}

// Manage actions which is triggered from user/app
const reducer = produce((state: CellsState = initialState, action: Action) => {
	switch (action.type) {
		case ActionType.SAVE_CELLS_ERROR:
			state.error = action.payload

			return state
		case ActionType.FETCH_CELLS:
			state.loading = true
			state.error = null

			return state
		case ActionType.FETCH_CELLS_COMPLETE:
			state.order = action.payload.map((cell) => cell.id)
			state.data = action.payload.reduce((acc, cell) => {
				acc[cell.id] = cell
				return acc
			}, {} as CellsState['data'])

			return state
		case ActionType.FETCH_CELLS_ERROR:
			state.loading = false
			state.error = action.payload

			return state
		case ActionType.MOVE_CELL:
			const { direction } = action.payload
			const index = state.order.findIndex((id) => id === action.payload.id)
			const targetIndex = direction === 'up' ? index - 1 : index + 1

			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return state
			}

			state.order[index] = state.order[targetIndex]
			state.order[targetIndex] = action.payload.id

			return state

		case ActionType.DELETE_CELL:
			delete state.data[action.payload]
			state.order = state.order.filter((id) => id !== action.payload)
			return state

		case ActionType.INSERT_CELL_AFTER:
			const cell: Cell = {
				content: '',
				type: action.payload.type,
				id: randomId(),
				date: dateFormat(new Date()),
			}
			state.data[cell.id] = cell

			const foundIndex = state.order.findIndex((id) => id === action.payload.id)
			if (foundIndex < 0) {
				state.order.unshift(cell.id)
			} else {
				state.order.splice(foundIndex + 1, 0, cell.id)
			}

			return state
			
		case ActionType.UPDATE_CELL:
			const { id, content } = action.payload
			state.data[id].content = content
			state.data[id].date = dateFormat(new Date())
			return state

		default:
			return state
	}
}, initialState)

const randomId = () => {
	return Math.random().toString(36).substr(2, 5)
}

const dateFormat = (date: Date) => {
	return (
		'last updated at ' +
		date.toLocaleDateString() +
		' ' +
		date.toLocaleTimeString().toLocaleLowerCase()
	)
}

export default reducer

//* structure of the cell data
// {
//   loading: false,
//   error: null,
//   data: {
//     'tete45': {
//       id: 'tete45',
//       type: 'code',
//       content: 'some string, like const arr= [...]....'
//     },
//     'tete45-2': {
//       id: 'tete45-2',
//       type: 'text',
//       content: 'some string'
//     }
//     a lot of object, nested in the data {}
//   }
//   order: [],
// }

//TODO this is implementation without immer library, to update cell
// return {
// 	...state,
// 	data: {
// 		...state.data,
// 		[id]: {
// 			...state.data[id],
// 			content,
// 		},
// 	},
// }
