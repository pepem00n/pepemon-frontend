import React, { useRef } from "react";
import styled, { keyframes, css } from 'styled-components';
import { useIsVisible } from '../../hooks';

const AnimatedImg: React.FC<any> = ({ src, alt }) => {
	const elemRef = useRef();
	const isVisible = useIsVisible(elemRef);

	return <StyledAnimatedImg ref={elemRef} {...{src, alt}} loading="lazy" isVisible={isVisible && true}/>
}

const bounceIn = keyframes`
	0% {
		opacity: 0;
		transform: translateY(200px);
	}
	50% {
		opacity: 1;
		transform: translateY(10px);
	}
	70% {
		transform: translateY(15px);
	}
	100% {
		transform: translateY(0px);
	}
`

const bounceInCss = css`
	animation: 1s ${bounceIn} ease-out;
`

const StyledAnimatedImg = styled.img<{isVisible?: boolean}>`
	${props => props.isVisible ? bounceInCss : ''}
`

export default AnimatedImg;
