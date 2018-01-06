// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Icon} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {
	getLayoutState,
	getLayoutMobileStatuses,
	getSidebarRoutes
} from 'selectors'
import {StyledSidebar} from './style'
import type {RouteItem} from 'types'

type Props = {
	open: boolean,
	logout: () => void,
	isMobile: boolean
}

class SidebarComponent extends Component<Props> {
	props: Props

	render () {
		const {open, isMobile} = this.props
		const routing: RouteItem[] = getSidebarRoutes()

		const sidebarProps = {
			visible: open || !isMobile,
			as: Menu,
			vertical: true,
			icon: 'labeled',
			animation: 'push',
			width: 'thin',
			inverted: true
		}

		const routes = routing.map((route, i) => {
			const {external, path, strict, exact, meta} = route
			const {icon, name} = meta
			// Props that are common for both "<a>" and "RR Link"
			const basicProps = {
				as: external ? 'a' : NavLink,
				link: true,
				[external ? 'href' : 'to']: path
			}

			// Is it's RR Link, then it needs additional props
			const externalProps = external
				? {}
				: {
					strict,
					exact,
					activeClassName: 'active'
				}

			// Summarize
			const propsMenuItem = {
				...externalProps,
				...basicProps
			}

			return (
				<Menu.Item key={i} {...propsMenuItem} icon>
					<Icon name={icon} /> {name}
				</Menu.Item>
			)
		})

		return <StyledSidebar {...sidebarProps}>{routes}</StyledSidebar>
	}
}

const mapStateToProps = state => {
	const {sidebarOpened} = getLayoutState(state)
	const {location} = state.routing
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		open: sidebarOpened,
		isMobile,
		location
	}
}

export default connect(mapStateToProps)(SidebarComponent)
