/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import {withRouter, matchPath} from 'react-router'
import _ from 'lodash'
import {TOGGLE_SIDEBAR} from 'actions/layout'
import {StyledHeader, HeaderInner, Navicon, PageTitle} from './style'
import {getLayoutMobileStatuses, getMetaRoutes} from 'selectors'
import Headroom from 'react-headroom'

type Props = {
	title: string,
	toggleSidebar: () => void,
	isMobile: boolean
}

const Header = ({title, toggleSidebar, isMobile}: Props) => {
	return (
		<Headroom>
			<StyledHeader>
				<HeaderInner>
					{isMobile && (
						<Navicon onClick={toggleSidebar}>
							<Icon name="content" />
						</Navicon>
					)}
					<PageTitle>{title}</PageTitle>
				</HeaderInner>
			</StyledHeader>
		</Headroom>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const currentRoute = _.find(getMetaRoutes(), a => matchPath(pathname, a))
	const title = currentRoute && currentRoute.meta && currentRoute.meta.name
	const {isMobile} = getLayoutMobileStatuses(state)
	return {
		title,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR())
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
