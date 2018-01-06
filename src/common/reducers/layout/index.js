// @flow
import {UI_TOGGLE_SIDEBAR, UI_WINDOW_RESIZE} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
import typeToReducer from 'type-to-reducer'

export const initialState: State = {
	sidebarOpened: false
}

export const layout = typeToReducer(
	{
		[UI_WINDOW_RESIZE] (state, action) {
			const {innerWidth} = action.payload
			return {
				...state,
				innerWidth
			}
		},
		[UI_TOGGLE_SIDEBAR] (state) {
			return {
				...state,
				sidebarOpened: !state.sidebarOpened
			}
		},
		[LOCATION_CHANGE] (state) {
			return {
				...state,
				sidebarOpened: false
			}
		}
	},
	initialState
)
