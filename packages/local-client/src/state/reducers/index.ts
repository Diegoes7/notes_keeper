import { combineReducers } from 'redux'
import cellsReducer from './cellsReducer'
import bundleReducer from './bundlesReducer'

const reducers = combineReducers({
	cells: cellsReducer,
	bundles: bundleReducer,
})

export default reducers

//! describe the overall structure of the state object/{}/ inside REDUX STORE
export type RootState = ReturnType<typeof reducers>
