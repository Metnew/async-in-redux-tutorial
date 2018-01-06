/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loader, List} from 'semantic-ui-react'
import {getStorageState, isLoaded} from 'selectors'
import {GET_DATA} from 'actions/storage'

type Props = {
	getData: () => void,
	data: any,
	isDataLoaded: boolean
}

class Summary extends Component {
	props: Props

	async asyncBootstrap () {
		const {isDataLoaded, getData} = this.props
		if (!isDataLoaded) {
			await getData()
		}
		return true
	}

	componentDidMount () {
		const {isDataLoaded, getData} = this.props
		if (!isDataLoaded) {
			getData()
		}
	}

	render () {
		const {isDataLoaded} = this.props
		return (
			<div>
				{!isDataLoaded ? (
					<Loader active>Loading data...</Loader>
				) : (
					<List relaxed divided animated>x</List>
				)}
			</div>
		)
	}
}

function mapStateToProps (state) {
	const linksState = getStorageState(state)
	const data = linksState.entities
	const isDataLoaded = isLoaded(linksState)
	return {data, isDataLoaded}
}

const mapDispatchToProps = dispatch => ({
	async getData () {
		return dispatch(GET_DATA())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
