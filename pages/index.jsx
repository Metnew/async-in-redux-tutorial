// @flow
import Page from 'components/Page'
import React from 'react'
import {connect} from 'react-redux'
import {Container} from 'semantic-ui-react'

import README from '../README.md'

const Dashboard = () => {
	return (
		<Container>
			<README />
		</Container>
	)
}

const mapStateToProps = state => {
	return {}
}

export default Page(connect(mapStateToProps)(Dashboard))
