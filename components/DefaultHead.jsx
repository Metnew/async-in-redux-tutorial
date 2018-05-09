import Head from 'next/head'
import React from 'react'

const DefaultHead = () => {
	return (
		<Head>
			<html lang={'en'} />
			<meta charSet="utf-8" />
			<title>Async redux actions</title>
			<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta
				name="description"
				content="Notes about redux async actions lifecycle"
			/>
			<meta name="theme-color" content="#1b1e2f" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<base href="/" />
			<meta name="msapplication-tap-highlight" content="no" />
			<link rel="manifest" href="manifest.json" />
			<noscript
				dangerouslySetInnerHTML={{
					__html: `You are using outdated browser. You can install modern browser here:
							<a href="http://outdatedbrowser.com/">http://outdatedbrowser.com</a>.`
				}}
			/>
		</Head>
	)
}

export default DefaultHead
