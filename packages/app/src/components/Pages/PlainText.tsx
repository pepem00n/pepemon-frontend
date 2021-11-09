import React from 'react';
import styled from 'styled-components/macro';
import { theme } from '../../theme';

const PlainText: React.FC<any> = ({children}) => {

	return (
		<StyledPlainText>
			{children}
		</StyledPlainText>
	)
}

const StyledPlainText = styled.div`
	background-color: ${theme.color.white};
	border-radius: ${theme.borderRadius}px;
	color: ${theme.color.headers};
	font-family: ${theme.font.inter};
	font-weight: normal;
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em) 2em;
`

export default PlainText
