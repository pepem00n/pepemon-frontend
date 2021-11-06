import styled from 'styled-components/macro';
import { theme } from  '../../theme';

interface ContentColumnsProps {
	justify?: string;
	width?: string;
	maxWidth?: string;
}

const ContentColumns = styled.div<ContentColumnsProps>`
	display: flex;
	flex-direction: column;
	justify-content: ${ props => props.justify && props.justify};
	width: ${ props => props.width && props.width};
	max-width: 100%;
	margin-left: auto;
	margin-right: auto;

	@media (min-width: ${theme.breakpoints.tabletL}) {
		flex-direction: row;
		max-width: ${ props => props.maxWidth ? props.maxWidth : theme.breakpoints.ultra};
	}
`

export default ContentColumns;
