// @flow
import {createSelector} from 'reselect'
import {routingFnCreator} from 'routing'

export const getLayoutState = state => state.layout
export const getStorageState = state => state.storage

export const getWindowInnerWidth = (window: Object): number => {
	const defaultWindowInnerWidth = 1025
	return window && window.innerWidth
		? window.innerWidth
		: defaultWindowInnerWidth
}

export const getLayoutMobileStatuses = createSelector(
	getLayoutState,
	({innerWidth}) => {
		const isMobile: boolean = innerWidth < 1025 // 1024px - breakpoint
		const isMobileXS: boolean = innerWidth < 481
		const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
		return {isMobileSM, isMobileXS, isMobile}
	}
)

export const getRoutes = routingFnCreator()
export const getMetaRoutes = routingFnCreator('meta')
export const getSidebarRoutes = routingFnCreator('sidebar')
export const getRouterRoutes = routingFnCreator('routing')

export const isLoaded = state => state.fetchStatus === 'loaded'
export const isLoading = state => state.fetchStatus === 'loading'
