import styled from 'styled-components';
import { theme } from  '../../theme';

interface ContentColumnsProps {
	justify?: string;
	width?: string;
	maxWidth?: string;
	desktopStyle?: any;
	mobileStyle?: any;
}

const ContentColumns = styled.div<ContentColumnsProps>`
	display: flex;
	flex-direction: column;
	justify-content: ${ props => props.justify && props.justify};
	width: ${ props => props.width && props.width};
	max-width: 100%;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: ${theme.breakpoints.desktop}) {
		${props => props.mobileStyle && props.mobileStyle}
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		${props => props.desktopStyle && props.desktopStyle}
	}

	@media (min-width: ${theme.breakpoints.tabletL}) {
		flex-direction: row;
		max-width: ${ props => props.maxWidth ? props.maxWidth : theme.breakpoints.ultra};
	}
`

export default ContentColumns;
