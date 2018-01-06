// @flow
import {awral} from 'actions/utils'
import {getDataAPI} from 'api/DataSvc'
// Define action types
export const GET_DATA_PREFIX = 'GET_DATA'

/**
  Awral is not recommended for production usage now
  But it can make your work with actions even simpler.
  NOTE: I strongly recommend you check Awral's sources!
  Awral is 910 bytes gzipped!
  {@link https://github.com/Metnew/awral}
*/
export const GET_DATA = awral(getDataAPI)('GET_DATA')
