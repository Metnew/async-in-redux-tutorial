// @flow
import Cookies from 'js-cookie'
export const JWT_TOKEN = 'JWT_TOKEN'

export function getLocalToken (): string | null {
	return Cookies.get(JWT_TOKEN)
}

export const isLoggedIn = () => !!getLocalToken()
