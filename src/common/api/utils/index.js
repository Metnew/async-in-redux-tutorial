// @flow
import wrapper from './xhr_wrapper'
export const directXhrWrapper = async (url) => {
	return fetch(url).then(res => res.json())
}
export const get = wrapper('GET')
