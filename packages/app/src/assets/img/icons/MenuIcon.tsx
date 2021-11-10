import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../../theme';

interface MenuIconProps {
	isOpen: boolean
}

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen }) => {
	return (
		<StyledMenuIcon isOpen={isOpen}>
			<TopStroke/>
			<MiddleStroke/>
			<BottomStroke/>
		</StyledMenuIcon>
	)
}

const animateTop = keyframes`
	0% {
		top: 0%;
		transform: translateY(-50%) rotate(0);
	}
	50% {
		top: 50%;
		transform: translateY(-50%) rotate(0deg);
	}
	100% {
		top: 50%;
		transform: translateY(-50%) rotate(45deg);
	}
`

const animateBottom = keyframes`
	0% {
		top: 100%;
		transform: translateY(-50%) rotate(0);
	}
	50% {
		top: 50%;
		transform: translateY(-50%) rotate(0deg);
	}
	100% {
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
	}
`

const animateTopCss = css`
	animation: ${animateTop} .2s ease-out 0s 1 normal forwards;
`

const animateBottomCss = css`
	animation: ${animateBottom} .2s ease-out 0s 1 normal forwards;
`

const StyledSpan = styled.span`
	left: 0;
	position: absolute;
	right: 0;
`

const TopStroke = styled(StyledSpan)`
	top: 0%;
`

const MiddleStroke = styled(StyledSpan)`
	top: 50%;
	transform: translateY(-50%);
`

const BottomStroke = styled(StyledSpan)`
	top: 100%;
	transform: translateY(-50%);
`

const StyledMenuIcon = styled.div<MenuIconProps>`
	height: 15px;
	position: relative;
	transition: all 1s ease-in;
	width: 20px;

	span {
		background-color: ${theme.color.black};
		display: block;
		height: 2px;
	}


		${TopStroke} { ${({isOpen}) => isOpen && animateTopCss } }
		${MiddleStroke} { ${({isOpen}) => isOpen && 'display: none;' } }
		${BottomStroke} { ${({isOpen}) => isOpen && animateBottomCss } }
`

export default MenuIcon
