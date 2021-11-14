import React from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';

const Badge: React.FC<{text: string}> = ({text}) => {
	return <StyledBadge>{text}</StyledBadge>
}

const StyledBadge = styled.span`
	background-image: linear-gradient(to bottom,#aa6cd6 -100%,#713aac);
	border-radius: 8px;
	padding: 3px 5px;
	color: ${theme.color.white};
	font-family: "Inter";
	font-size: .7rem;
	position: absolute;
	right: -2em;
	top: -1.2em;
`

export default Badge;
