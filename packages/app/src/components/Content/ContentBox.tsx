import styled from "styled-components/macro";
import { theme } from '../../theme';

const ContentBox = styled.div<{bgColor?: string, shadow?: boolean}>`
	background-color: ${props => props.bgColor ? props.bgColor : props.theme.color.white};
	border-radius: 8px;
	padding: 1em 1.25em;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	position: relative;

	${({shadow}) => shadow && `
		box-shadow: 2px 4px 10px 5px ${theme.color.colorsLayoutShadows};
	`}
`

export const ContentBoxNumber = styled.span`
	color: ${props => props.theme.color.white};
	font-size: 1.125rem;
	font-weight: 700;
	left: 50%;
	margin-bottom: -1em;
	margin-top: 0;
	position: relative;
	text-align: center;
	top: 0;
	transform: translateX(-50%) translateY(-80%);

	span {
		background-color: ${props => props.theme.color.headers};
		display: inline-block;
		border-radius: 8px;
		padding: 0.6em 1em;
	}
`

export default ContentBox;
