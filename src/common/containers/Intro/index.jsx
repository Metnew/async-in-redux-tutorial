// @flow
import React from 'react'
import {List, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Dashboard = () => {
	const whyBlock = [
		{
			header: "Async isn't pure",
			description: `Async stuff isn't pure, so it's hard to handle it.`
		},
		{
			header: 'Code duplication',
			description:
				'Async stuff commonly leads to code duplication in Redux apps.'
		},
		{
			header: 'Complex logic',
			description:
				'Async stuff always has complex logic. Different request params, '
		}
	]

	const howBlock = [
		{
			header: 'Redux only',
			description: `We will not cover any other flux-architecture libs except Redux, because
	Redux is canonical, well known and minimalistic.`
		},
		{
			header: (
				<List.Header>
					Hello <b>`Real`</b> World
				</List.Header>
			),
			description: `"Hello world" code and cases isn't considered. Only <b>real-life</b> cases.`
		},
		{
			header: 'Time is money',
			description: `Guide is short.`
		}
	]

	const patterns = [
		{
			header: 'Thunk',
			description: `Redux-thunk in a wild.`,
			to: ''
		},
		{
			header: `Action lifecycle.`,
			description: `Any async action has lifecycle.`,
			to: ''
		},
		{
			header: 'Promise middleware. AWRAL.',
			description: 'Redux libs making work with async simpler (harder).',
			to: ''
		},
		{
			header: `Server-side rendering and data fetching.`,
			description: `How to build SSR + DF with no duplications and antipatterns.`,
			to: ''
		},
		{
			header: 'Bonus: Redux-Form + Awral',
			description: 'Working with Redux-Form and AWRAL.',
			to: ''
		}
	]

	const antipatterns = [
		{
			header: 'No XHR agent (wrapper)',
			description: `We will not cover any other flux-architecture libs except Redux, because
	Redux is canonical, well known and minimalistic.`,
			to: '/'
		},
		{
			header: `No Redux`,
			x: `If you think that you could write an`,
			description: `Flux-architecture/reactive programming library is a must, if you have only component library (React).`,
			to: '/'
		},
		{
			header: 'Redux without thunk',
			description:
				'Async stuff always has complex logic. Different request params, payloads, race conditions, different response structures.',
			to: '/'
		}
	]

	return (
		<div>
			<Header as="h1">Async stuff in Redux.</Header>
			<Header as="h1">Async stuff in Redux.</Header>
			<Header as="h4" subheader={<Link to="/summary">TL;DR</Link>} />
			<Header as="h3">Why?</Header>
			<List relaxed size="large" divided>
				{whyBlock.map((a, i) => {
					return <List.Item {...a} key={i} />
				})}
			</List>
			<Header as="h3">How?</Header>
			<List relaxed size="large" divided>
				{howBlock.map((a, i) => {
					return <List.Item {...a} key={i} />
				})}
			</List>
			<Header as="h3">Antipatterns:</Header>
			<List relaxed size="large" divided>
				{antipatterns.map(({header, to, description}, i) => {
					return (
						<List.Item
							as={Link}
							header={<a href="">{header}</a>}
							to={to}
							description={description}
							key={i}
						/>
					)
				})}
			</List>

			<Header as="h3">Patterns:</Header>
			<List relaxed size="large" divided>
				{patterns.map(({header, to, description}, i) => {
					return (
						<List.Item
							as={Link}
							header={<a href="">{header}</a>}
							to={to}
							description={description}
							key={i}
						/>
					)
				})}
			</List>

			<Header as={Link} to="/summary">
				Summary.
			</Header>
		</div>
	)
}

export default Dashboard
