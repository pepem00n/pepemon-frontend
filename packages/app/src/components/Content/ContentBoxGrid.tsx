import styled from "styled-components/macro";
import { theme } from  '../../theme';

interface ContentBoxGridProps {
	gridTemplate?: string;
}

const ContentBoxGrid = styled.div<ContentBoxGridProps>`
	display: grid;
	grid-auto-columns: 1fr;
	row-gap: 1.25em;
	grid-template: ${props => props.gridTemplate && props.gridTemplate};

	@media (min-width: ${theme.breakpoints.tabletL}) {
		column-gap: 1.25em;
	}
`

export default ContentBoxGrid;
