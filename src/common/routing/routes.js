// @flow
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {asyncComponent} from 'react-async-component'
import {Loader, Dimmer, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import type {RouteItem} from 'types'

function asyncComponentCreator (url) {
	return asyncComponent({
		// flow-disable-next-line: The parameter passed to import() must be a literal string
		resolve: () => import(/* webpackChunkName:"[index].[request]" */ `containers/${url}/index.jsx`),
		LoadingComponent () {
			return (
				<Dimmer active>
					<Loader size="large" active>
						Loading page...
					</Loader>
				</Dimmer>
			)
		},
		ErrorComponent () {
			return (
				<Dimmer active>
					<Header inverted as="h2" icon textAlign="center">
						<Icon name="refresh" />
						Refresh
						<Header.Subheader>Got error while loading page.</Header.Subheader>
					</Header>
				</Dimmer>
			)
		},
		autoResolveES2015Default: true,
		env: process.env.BROWSER ? 'browser' : 'node',
		serverMode: 'resolve'
	})
}

const [Intro, XHRAgent, NoRedux, NoThunk, PromiseMiddleware, Thunk, Awral, ActionLifecycle, ReduxForm, Summary] = [
	'Intro',
	'XHR_Agent',
	'NoRedux',
	'NoThunk',
	'PromiseMiddleware',
	'Thunk',
	'Awral',
	'ActionLifecycle',
	'ReduxForm',
	'Summary'
].map(asyncComponentCreator)

const routes: Array<RouteItem> = [
	{
		path: '/',
		exact: true,
		tag: Route,
		component: Intro,
		meta: {
			icon: 'home',
			name: 'Intro',
			sidebarVisible: true
		}
	},
	{
		path: '/no-xhr-wrapper',
		exact: true,
		tag: Route,
		component: XHRAgent,
		meta: {
			icon: 'remove',
			name: 'No XHR wrapper',
			sidebarVisible: true
		}
	},
	{
		path: '/no-redux',
		exact: true,
		tag: Route,
		component: NoRedux,
		meta: {
			icon: 'remove',
			name: 'No Redux',
			sidebarVisible: true
		}
	},
	{
		path: '/no-thunk',
		exact: true,
		tag: Route,
		component: NoThunk,
		meta: {
			icon: 'remove',
			name: 'No Thunk',
			sidebarVisible: true
		}
	},
	{
		path: '/thunk',
		exact: true,
		tag: Route,
		component: Thunk,
		meta: {
			name: 'Thunk',
			icon: 'checkmark',
			sidebarVisible: true
		}
	},
	{
		path: '/promise-middleware',
		exact: true,
		tag: Route,
		component: PromiseMiddleware,
		meta: {
			icon: 'checkmark',
			name: 'Promise Middleware',
			sidebarVisible: true
		}
	},
	{
		path: '/action-lifecycle',
		exact: true,
		tag: Route,
		component: ActionLifecycle,
		meta: {
			name: 'Action Lifecycle',
			icon: 'bookmark',
			sidebarVisible: true
		}
	},
	{
		path: '/awral',
		exact: true,
		tag: Route,
		component: Awral,
		meta: {
			name: 'AWRAL',
			icon: 'bookmark',
			sidebarVisible: true
		}
	},
	{
		path: '/redux-form',
		exact: true,
		tag: Route,
		component: ReduxForm,
		meta: {
			icon: 'checkmark',
			name: 'Redux form',
			sidebarVisible: true
		}
	},
	{
		path: '/summary',
		exact: true,
		tag: Route,
		component: Summary,
		meta: {
			name: 'Summary',
			icon: 'bookmark',
			sidebarVisible: true
		}
	},
	{
		tag: Redirect,
		to: '/'
	}
]

const sidebarExternalLinks = [
	{
		external: true,
		path: 'https://github.com/Metnew/async-in-redux-tutorial',
		meta: {
			sidebarVisible: true,
			icon: 'github',
			name: 'Github'
		}
	}
]

const fns = {
	// Returns routing for sidebar menu
	sidebar (x: Array<RouteItem> = routes.concat(sidebarExternalLinks)) {
		return x
			.filter(a => a.meta && a.meta.sidebarVisible)
			.map(a => _.pick(a, ['path', 'meta', 'external', 'strict', 'exact']))
	},
	// Returns routing for React-Router
	routing (x: Array<RouteItem> = routes) {
		return x
			.filter(a => a.tag)
			.map(a =>
				_.pick(a, [
					'path',
					'strict',
					'exact',
					'component',
					'tag',
					'to'
				])
			)
	},
	// Returns `meta` + path. used in Header
	meta (x: Array<RouteItem> = routes) {
		return x
			.filter(a => a.tag)
			.map(a =>
				_.pick(a, [
					'path',
					'strict',
					'exact',
					'meta'
				])
			)
	},
	all () {
		return routes
	}
}
export const routingFnCreator = (useFor: 'sidebar' | 'routing' | 'meta' | 'all' = 'all') => fns[useFor]

/*
no redux -> componentDidMount + fetch
direct fetch is bad, need custom api client wrapper, any form of util to reduce code duplication and structurize api

redux, mapDispatchToProps -> componentDidMount

 */
