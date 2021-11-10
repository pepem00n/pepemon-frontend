import styled from "styled-components";
import { theme } from  '../../theme';

interface ContentCenteredProps {
	bgColor?: string;
	direction?: string;
	maxWidth?: string;
	padding?: string;
}

const ContentCentered = styled.div<ContentCenteredProps>`
	align-items: center;
	background-color: ${ props => props.bgColor && props.bgColor };
	display: flex;
	flex-direction: column;
	flex-direction: ${ props => props.direction ? props.direction : "column"};
	justify-content: center;
	max-width: ${ props => props.maxWidth ? props.maxWidth : `min(100%, ${theme.breakpoints.ultra})`};
	margin-left: auto;
	margin-right: auto;
	padding: ${ props => props.padding && props.padding };
`

export default ContentCentered;
