// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxFormReducer} from 'redux-form'

import {layout} from './layout'
import {storage} from './storage'

// Root reducer
export default combineReducers({
	layout,
	storage,
	routing: routerReducer,
	form: reduxFormReducer
})
