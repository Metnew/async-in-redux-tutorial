// @flow
import {GET_DATA_PREFIX} from 'actions/storage'
import typeToReducer from 'type-to-reducer'

export const initialState = {
	entities: [],
	errors: {},
	fetchStatus: 'none'
}

export const storage = typeToReducer(
	{
		[GET_DATA_PREFIX]: {
			PENDING (state, action) {
				return {
					...state,
					errors: {},
					fetchStatus: 'loading'
				}
			},
			SUCCESS (state, action) {
				return {
					...state,
					entities: action.payload,
					fetchStatus: 'loaded'
				}
			},
			FAIL (state, action) {
				return {
					...state,
					errors: action.payload,
					fetchStatus: 'loaded'
				}
			}
		}
	},
	initialState
)
