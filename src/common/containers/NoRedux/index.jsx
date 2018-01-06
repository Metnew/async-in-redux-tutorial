// @flow
import React, {Component} from 'react'
import {Header, List} from 'semantic-ui-react'
import Highlight from 'react-highlight'

type State = {
	data: any
}

class NoRedux extends Component {
	state: State = {
		data: null
	}

	async getData () {
		fetch('/api/v1/data')
			.then(res => res.json())
			.then(res => {
				this.setState({data: res})
			})
	}

	componentDidMount () {
		this.getData()
	}

	render () {
		console.log(this.state.data)
		return (
			<div>
				<Header as="h1">Async without Redux</Header>
				<Highlight className="json">
					{JSON.stringify(this.state.data, undefined, 4)}
				</Highlight>
				<p>
					As I think, the most accurate description of working on React app
					without flux-architecture/reactive programming lib is - Bear Grills
					...
				</p>
				<p>Downsides:</p>
				<List>
					<List.Item>
						<List.Header>
							{`Request status data lives in component's state`}
						</List.Header>
					</List.Item>
					<List.Item>
						<List.Header>{`Request result lives in component's state`}</List.Header>
					</List.Item>
					<List.Item>
						<List.Header>{`Other components don't know request happens.`}</List.Header>
					</List.Item>
				</List>

				<Header />
				<Highlight className="js">
					{`class NoRedux extends Component {
  async getData () {
    this.setState(async () => {
      return {
        data: await fetch('/api/v1/no-redux').then(res => res.json())
      }
    })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <pre>
        <code>{JSON.stringify(this.state.data, undefined, 4)}</code>
      </pre>
    )
  }
}`}
				</Highlight>
			</div>
		)
	}
}

export default NoRedux
