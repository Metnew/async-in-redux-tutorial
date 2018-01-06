// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {APPLICATION_INIT} from 'actions/common'
import App from 'containers/App'
import RoutingWrapper from 'components/parts/RoutingWrapper'

const Router = process.env.BROWSER
	? require('react-router-redux').ConnectedRouter
	: require('react-router').StaticRouter

type Props = {
	store: Object,
	SSR: {
		location?: Object,
		context?: Object
	},
	history: any
}

export default class Root extends Component<Props> {
	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		this.props.store.dispatch({type: APPLICATION_INIT})
	}

	render () {
		const {SSR, store, history} = this.props
		const routerProps = process.env.BROWSER
			? {history}
			: {location: SSR.location, context: SSR.context}
		// key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395

		return (
			<Provider store={store} key={Date.now()}>
				<Router {...routerProps}>
					<App>
						<RoutingWrapper />
					</App>
				</Router>
			</Provider>
		)
	}
}
