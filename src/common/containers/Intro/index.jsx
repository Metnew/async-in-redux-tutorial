// @flow
import React from 'react'
import {Helmet} from 'react-helmet'
import {Grid} from 'semantic-ui-react'

const Dashboard = () => {
	return (
		<div>
			<Helmet>
				<title>Suicrux:Dashboard</title>
			</Helmet>
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16} />
				</Grid.Row>
			</Grid>
		</div>
	)
}

export default Dashboard
