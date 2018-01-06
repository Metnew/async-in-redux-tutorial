// @flow
import {get} from 'api/utils'

export async function getDataAPI () {
	return get(`/data`)
}
