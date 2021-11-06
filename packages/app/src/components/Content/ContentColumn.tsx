import styled from 'styled-components/macro';
import { theme } from '../../theme';

interface ContentColumnProps {
	width?: string;
	space?: string
}

const ContentColumn = styled.div<ContentColumnProps>`
	@media (min-width: ${theme.breakpoints.tabletL}) {
		width: ${ props => props.width && props.width };

		&:not(:first-child) {
			margin-left: ${props => props.space && props.space};
		}
	}
`

export default ContentColumn;
