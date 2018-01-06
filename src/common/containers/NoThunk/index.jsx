// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, List} from 'semantic-ui-react'
import {directXhrWrapper as xhrWrapper} from 'api/utils'

type Props = {
	getData: any
}

class NoThunk extends Component<Props> {
	componentDidMount () {
		this.props.getData()
	}

	render () {
		return (
			<div>
				<h1>Async stuff w\o Thunk</h1>
				<h2>{`Let's start from antipatterns:`}</h2>
				<h2>{`Never do this!`}</h2>
				<p>
					{`The first rule of the async-stuff club is "Never request data using
					fetch/XHR directly in the componentDidMount()"`}
				</p>
				<p>
					{`The second rule - "Never request data using fetch/XHR directly in the
					componentDidMount()"`}
				</p>
				<p>{`Probably, it's obvious why it's bad:`}</p>
				<pre />
				<Header>Downsides:</Header>
				<List.Item>
					<List.Icon name="github" size="large" verticalAlign="middle" />
					<List.Content>
						<List.Header as="a">Duplication</List.Header>
						<List.Description as="a">Updated 22 mins ago</List.Description>
					</List.Content>
				</List.Item>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	data: state.storage.entities
})

const mapDispatchToProps = dispatch => ({
	getData () {
		dispatch({type: 'GET_DATA_PENDING'})
		xhrWrapper('/api/v1/data')
			.then(res => dispatch({type: 'GET_DATA_SUCCESS', payload: res.data}))
			.catch(err => dispatch({type: 'GET_DATA_FAIL', payload: err}))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(NoThunk)
