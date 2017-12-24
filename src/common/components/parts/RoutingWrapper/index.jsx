/**
 * @flow
 */
import React from 'react'
import {Switch} from 'react-router-dom'
import _ from 'lodash'
import type {RouteItem} from 'types'
import {getRouterRoutes} from 'selectors'

const RoutingWrapper = () => {
	const routes = getRouterRoutes()
	// render components that are inside Switch (main view)
	const routesRendered = routes.map((a: RouteItem, i) => {
		// Get tag for Route.
		const Tag = a.tag
		return <Tag key={i} {..._.omit(a, 'tag')} />
	})

	return <Switch>{routesRendered}</Switch>
}

export default RoutingWrapper
