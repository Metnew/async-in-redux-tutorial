// @flow
// Styles
import 'semantic-ui-css/semantic.css'
import 'highlight.js/styles/ocean.css'
// babel polyfill (ie 10-11) + fetch polyfill
import 'babel-polyfill'
import 'isomorphic-fetch'
// Application
import React from 'react'
import {hydrate} from 'react-dom'
import {AsyncComponentProvider} from 'react-async-component'
import asyncBootstrapper from 'react-async-bootstrapper'
import {configureApp, configureRootComponent} from 'common/app'
import {AppContainer} from 'react-hot-loader'
import type {GlobalState} from 'reducers'

if (process.env.NODE_ENV === 'production') {
	require('common/pwa')
}

const initialState: GlobalState = window.__INITIAL_STATE__ || {}
const asyncState: Object = window.__ASYNC_STATE__ || {}

const {store, routes, history} = configureApp(initialState)
const RootComponent = configureRootComponent({
	store,
	routes,
	history
})

const app = (
	<AppContainer warnings={false}>
		<AsyncComponentProvider rehydrateState={asyncState}>
			{RootComponent}
		</AsyncComponentProvider>
	</AppContainer>
)

asyncBootstrapper(app).then(() => {
	console.log('__INITIAL_STATE__:', initialState)
	hydrate(app, document.getElementById('app'))
})

if (module.hot) {
	module.hot.accept()
}
