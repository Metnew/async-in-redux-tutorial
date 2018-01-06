import styled from 'styled-components'
import {media} from 'styles/utils'

export const StyledHeader = styled.header`
	background: #f6f6f6;
	border-bottom: 1px solid #eee;
	box-shadow: inset 0 0 0 0 #eee, 0 2px 1px 0 #eee;
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	z-index: 444;
	height: 72px;
`

export const HeaderInner = styled.div`
	display: flex;
	padding: 0 15px;
`

export const PageTitle = styled.span`
	line-height: 1;
	font-size: 24px;
	align-items: center;
	display: flex;
`

export const Navicon = styled.span`
	width: 48px;
	height: 48px;
	padding: 12px;
	line-height: 1;
	font-size: 24px;
	display: none;
	${media.md`
		display: block;
	`};
`
