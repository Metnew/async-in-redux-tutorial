// @flow
import React from 'react'
import {List, Header} from 'semantic-ui-react'
import Highlight from 'react-highlight'

const ActionLifecycle = () => {
	return (
		<div>
			When you work with async stuff you probably have next code in your
			container:
			<Highlight className="js">
				{`const mapStateToProps = state => ({userId: state.userId})
					const mapDispatchToProps = dispatch => ({
						getUser(id) {
							dispatch(GET_USER(id))
						}
					})`}
			</Highlight>
			Where `GET_USER` is the next async action:
			<Highlight className="js">
				{`export const GET_USER = id => async (dispatch, getState) => {
				const state = getState()
				// 1. Validate input before dispatching \`pending\`
				if (id === 111 && state.user === 'Alex') {
					// 1.1 Do something if input is invalid
					const payload = {
						error: \`You can't do it, because you're Alex and your id is 111\`
					}
					dispatch({type: 'GET_USER_FAIL', meta: id, payload, error: true})
					return {payload, status: {error: true}}
				}
				// 2. Dispatch \`PENDING\` action
				dispatch({type: 'GET_USER_PENDING'}, (meta: id))
				// 3. Create payload for async function
				const apiPayload = {id, token: state.token}
				// 4. Obtain result from async function
				const result = await getUserFromServer(apiPayload)

				// 5. Check is request successful or failed (contains errors).
				const status = result.ok && result !== 400 ? {success: true} : {error: true}
			  // 6. Get data from request object (typically accessible as \`result.data\`)
				const payload = resultFromServer.data
				if (resultFromServer.ok) {
			    // 7.if result successful -> dispatch \`SUCCESS\` action
					dispatch({type: 'GET_USER_SUCCESS', meta: id, payload})
				} else {
					// 8.if result failed -> dispatch \`FAIL\` action
					dispatch({type: 'GET_USER_FAIL', meta: id, payload, error: true})
				}

				// 9. Finally do/dispatch something
				dispatch({type: 'GET_USER_FINALLY', meta: id, payload})
			  // 10. Resolve values (typical case for Redux-form, but about it later)
				return {payload, status}
			}`}
			</Highlight>
			<Header>As you see, there are few steps here:</Header>
			<List as="ol">
				<List.Item>
					Validate input before dispatching \`pending\` and Do something if
					input is invalid
				</List.Item>
				<List.Item>Dispatch \`PENDING\` action</List.Item>
				<List.Item>Create payload for async function</List.Item>
				<List.Item>Get result of async function</List.Item>
				<List.Item>
					Check is request successful or failed (contains errors).
				</List.Item>
				<List.Item>
					Get data from request object (typically accessible as \`result.data\`)
				</List.Item>
				<List.Item>
					{`if result successful -> dispatch \`SUCCESS\` action`}
				</List.Item>
				<List.Item>{`if result failed -> dispatch \`FAIL\` action`}</List.Item>
				<List.Item>Finally do/dispatch something</List.Item>
				<List.Item>Return values</List.Item>
			</List>
			{`In a big projects duplicating this *lifecycle* in each action isn't DRY
			(honestly, it'd be a crime.). Imagine that you have 300 similar actions in
			your app. Much logic will be duplicated.`}
		</div>
	)
}

export default ActionLifecycle
