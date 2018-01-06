/**
 * @flow
 */

import fetch from 'isomorphic-fetch'
import _ from 'lodash'

/**
 * Create request wrapper for certain method
 * @param  {String} method - Request method
 * @return {Function}
 */
const requestWrapper = (
	method: 'GET' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PUT' | 'PATCH'
) => {
	/**
	 * @param  {String} 	url        				Request URL
	 * @param  {Object} 	[data= null]			Data for Request
	 * @param  {Object} 	[options= {}]			Additional options
	 * @param  {Function} [cb = (a) => a]		Transform request before it will be sent
	 * @return {Object}             				Request response
	 */
	return (
		url: string,
		data: Object | null = null,
		options: Object = {},
		cb: (request: Object) => Object = a => a
	) => (dispatch, getState) => {
		// get decorated url and request params
		const {requestURL, request} = decorateRequest({
			method,
			url,
			data,
			options
		})

		return fetch(requestURL, request)
			.then(checkStatus)
			.then(parseJSON)
			.catch((err: string) => {
				console.error(err)
				return err
			})
	}
}

/**
 * middlewares
 * 1. parse response
 * 2. add "ok" property to result
 * 3. return request result
 * @param  {Object} res - Response from resource
 * @return {Object} response result with "ok" property
 */
async function parseJSON (res: Response): Object {
	let json: Object
	const {status} = res
	// status response field in return object
	try {
		json = await res.json()
	} catch (e) {
		if (res.status === 204) {
			return {ok: true, data: {}, status}
		}
		return {ok: false, status}
	}
	if (!res.ok) {
		return {data: json, ok: false, status}
	}
	return {data: json, ok: true, status}
}

/**
 * Checks response status
 * @param  {Object} response - Response
 * @return {Object}          - Response
 */
function checkStatus (response: Response): Response {
	const {status} = response
	if (status >= 200 && status < 300) {
		// Everything is ok
	} else if (status >= 300 && status < 400) {
		// 300 - Multiple Choices
		// 301 - Moved Permanently,
		// 302 - Found, Moved Temporarily
		// 304 - not modified
		// 307 - Temporary Redirect
	} else if (status === 400) {
		// Probably is a validation error
	} else if (status === 403 || status === 401) {
		// 401 - Forbidden
		// 403 - Unauthorized
	} else if (status === 404) {
		// Not Found
	} else if (status >= 500) {
		// Server error
	}
	return response
}

/**
 * Creates request to `url` with `data`
 * @param  {String} 	method        		Request method
 * @param  {String} 	url        				Request URL
 * @param  {Object} 	[data= null]			Data for Request
 * @param  {Object} 	[options= {}]			Additional options
 * @param  {Function} [cb = (a) => a]		Transform request before it will be sent
 * @return {Object}             				{URL, request}
 */
const decorateRequest = method => {
	// Default params for fetch = method + (Content-Type)
	const defaults = {
		method,
		headers: {},
		mode: process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin'
	}
	return ({url, data, options}): Object => {
		const requestURL = process.env.BASE_API + url
		const requestHeadersDataDecoration = transformBodyType(data)
		const request = _.merge({}, defaults, options, requestHeadersDataDecoration)

		return {
			request,
			requestURL
		}
	}
}

function transformBodyType (data): Object {
	const transform = {
		json (data) {
			return {
				headers: {'Content-Type': 'application/json; charset=UTF-8'},
				body: JSON.stringify(data)
			}
		}
	}

	return transform.json(data)
}

// USAGE:
// get('https://www.google.com', options)
// post('https://www.google.com', data, options)

export default requestWrapper
