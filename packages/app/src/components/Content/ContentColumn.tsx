import styled from 'styled-components';
import { theme } from '../../theme';

interface ContentColumnProps {
	width?: string;
	space?: string
	desktopStyle?: any;
	tabletLStyle?: any;
	mobileStyle?: any;
  align?: "flex-start" | "center" | "flex-end";
}

const ContentColumn = styled.div<ContentColumnProps>`
  ${({align}) => align && `
    display: flex;
    flex-direction: column;
    justify-content: ${align};
  `}

	@media (max-width: ${theme.breakpoints.desktop}) {
		${props => props.mobileStyle && props.mobileStyle}
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		${props => props.desktopStyle && props.desktopStyle}
	}

	@media (min-width: ${theme.breakpoints.tabletL}) {
		width: ${ props => props.width && props.width };
		${props => props.tabletLStyle && props.tabletLStyle}

		&:not(:first-child) {
			margin-left: ${props => props.space && props.space};
		}
	}
`

export default ContentColumn;
