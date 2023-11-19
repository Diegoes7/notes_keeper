import { Dispatch } from 'redux'
import { ActionType } from '../action-types'
import { BundleStartAction, BundleCompleteAction } from '../actions'
import EsBuild from '../../bundler'

export const createBundle = (cellID: string, input: string) => {
	return async (
		dispatch: Dispatch<BundleCompleteAction | BundleStartAction>
	) => {
		dispatch({
			type: ActionType.BUNDLE_START,
			payload: {
				cellID,
			},
		})

		const { code, err } = await EsBuild(input)

		dispatch({
			type: ActionType.BUNDLE_COMPLETE,
			payload: {
				cellID,
				bundle: {
					code,
					err
				},
			},
		})
	}
}
