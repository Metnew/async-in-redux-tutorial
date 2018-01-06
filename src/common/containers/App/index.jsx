/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// Import main views
import Sidebar from 'components/parts/Sidebar'
import Footer from 'components/parts/Footer'
import Header from 'components/parts/Header'
// Import actions
import {TOGGLE_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {
	getLayoutState,
	getWindowInnerWidth,
	getLayoutMobileStatuses
} from 'selectors'
import ReactGA from 'react-ga'
import hljs from 'highlight.js'
// Import styled components
import {
	PageLayout,
	MainLayout,
	MainContent,
	SidebarSemanticPusherStyled,
	SidebarSemanticPushableStyled,
	MainContainer,
	StyledDimmer
} from './style'
import type {GlobalState} from 'reducers'

type Props = {
	children: React$Node,
	// sidebarOpened forces component to re-render
	sidebarOpened: boolean,
	toggleSidebar: Function,
	handleWindowResize: Function,
	// IsMobile can force component to re-render
	isMobile: boolean
}

class App extends Component<Props> {
	componentWillMount () {
		if (process.env.BROWSER) {
			const {handleWindowResize} = this.props
			handleWindowResize()
			window.addEventListener('resize', handleWindowResize)
		}
	}

	componentDidMount () {
		if (process.env.BROWSER && process.env.SENTRY_PUBLIC_DSN) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.crossorigin = 'anonymous'
			script.async = true
			script.onload = () => {
				Raven.config(process.env.SENTRY_PUBLIC_DSN).install()
			}
			script.src = 'https://cdn.ravenjs.com/3.19.1/raven.min.js'
			document.body.appendChild(script)
		}

		if (process.env.BROWSER && process.env.GA_ID) {
			ReactGA.initialize(process.env.GA_ID)
			ReactGA.pageview(process.env.GA_ID)
		}

		// Init highlight.js options
		hljs.configure({
			tabReplace: '  ', // 2 spaces
			classPrefix: 'js'
		})
		hljs.initHighlighting()
	}

	render () {
		const {
			children,
			sidebarOpened,
			toggleSidebar,
			isMobile
		} = this.props

		const dimmerProps = {
			active: sidebarOpened,
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		return (
			<PageLayout>
				<SidebarSemanticPushableStyled>
					<Sidebar />
					<SidebarSemanticPusherStyled
						ismobile={isMobile ? '1' : ''}
					>
						<StyledDimmer {...dimmerProps} />
						<Header />
						<MainLayout>
							<MainContent>
								<MainContainer>{children}</MainContainer>
								<Footer />
							</MainContent>
						</MainLayout>
					</SidebarSemanticPusherStyled>
				</SidebarSemanticPushableStyled>
			</PageLayout>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const {sidebarOpened} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		sidebarOpened,
		isMobile
	}
}

function mapDispatchToProps (dispatch) {
	let resizer
	return {
		toggleSidebar () {
			dispatch(TOGGLE_SIDEBAR())
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = getWindowInnerWidth(window)
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 100)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
