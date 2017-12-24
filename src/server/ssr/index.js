/**
 * @flow
 * @desc
 */
import React from 'react'
import {renderToNodeStream} from 'react-dom/server'
import {ServerStyleSheet, StyleSheetManager} from 'styled-components'
import {configureRootComponent, configureApp} from 'common/app'
import asyncBootstrapper from 'react-async-bootstrapper'
import {AsyncComponentProvider, createAsyncContext} from 'react-async-component'
import HTMLComponent from './HTMLComponent'
import getStats from './stats'

export default async (req: express$Request, res: express$Response) => {
	// probably, it'd better to define these objs in global scope
	const {assets, faviconsAssets} = await getStats()
	const initialState: Object = {}
	const sheet = new ServerStyleSheet()
	const location: string = req.url
	const context = {}
	const {store, history, routes} = configureApp(initialState)
	const RootComponent: React$Node = configureRootComponent({
		store,
		history,
		routes,
		SSR: {location, context}
	})
	const asyncContext = createAsyncContext()

	const app = (
		<AsyncComponentProvider asyncContext={asyncContext}>
			<StyleSheetManager sheet={sheet.instance}>
				{RootComponent}
			</StyleSheetManager>
		</AsyncComponentProvider>
	)

	asyncBootstrapper(app).then(() => {
		const appStream = renderToNodeStream(app)
		const css: string = sheet.getStyleTags()
		const preloadedState: Object = store.getState()
		const asyncState = asyncContext.getState()
		const props = {
			css,
			assets,
			faviconsAssets,
			asyncState,
			initialState: preloadedState
		}

		const {beforeAppTag, afterAppTag} = HTMLComponent(props)

		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.write(beforeAppTag)
		res.write(`<div id="app">`)
		appStream.pipe(res, {end: false})

		appStream.on('end', () => {
			res.write('</div>')
			res.write(afterAppTag)
			res.end()
		})
	})
}
