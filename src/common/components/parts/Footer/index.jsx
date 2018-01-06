/**
 * @flow
 */
import React from 'react'
import {Grid, Header, Icon} from 'semantic-ui-react'
import {StyledFooter, StyledFooterInner} from './style'

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterInner>
				<Grid relaxed>
					<Grid.Row verticalAlign="middle">
						<Grid.Column width={12} mobile={16}>
							<a href="https://github.com/Metnew">
								<Header as="h3">
									<Icon name="github" />
									<Header.Content>
										Async in Redux
										<Header.Subheader>
											by @Metnew
										</Header.Subheader>
									</Header.Content>
								</Header>
							</a>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</StyledFooterInner>
		</StyledFooter>
	)
}

export default Footer
