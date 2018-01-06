// @flow
import React, {Component} from 'react'
import {Header, List} from 'semantic-ui-react'
type Props = any

class NoXHRAgent extends Component<Props> {
	render () {
		return (
			<div>
				<Header as="h1">Why wrapper for your request agent is important?</Header>
				<p>
					Imagine that in your app you use `fetch` directly for every requeest
					and every fetch is parametrized distinctly. That could lead to
					unnecessary code duplication that will be very hard to manage.
				</p>
				<p>
					{`That's why most projects use wrapper for async requests to API. Most notable features encasulated in wrapper:`}
				</p>
				<List size="large">
					<List.Item>
						<List.Header>Request headers management</List.Header>
						<List.Description>
							Authorization headers management, meta headers management.
						</List.Description>
					</List.Item>
					<List.Item>
						<List.Header>Request url management</List.Header>
						<List.Description>
							API often has api prefix (like `/api/v1`). API wrapper could know
							backend API map(structure).
						</List.Description>
					</List.Item>
					<List.Item>
						<List.Header>JSON result parsing</List.Header>
					</List.Item>
					<List.Item>
						<List.Header>Response status check</List.Header>
					</List.Item>
					<List.Item>
						<List.Header>
							Request payload(data) management (optional)
						</List.Header>
						<List.Description>
							Request payload could be transformed inside the wrapper. For
							example, an object will be stringified before request. If payload
							is inctance of FormData, then specific meta fields could be added.
						</List.Description>
					</List.Item>
				</List>
				<Header>{`This concept is important to understand what's going on later.`}</Header>
				<Header>Simple request wrapper example: `link-to-github`. </Header>
			</div>
		)
	}
}
export default NoXHRAgent
