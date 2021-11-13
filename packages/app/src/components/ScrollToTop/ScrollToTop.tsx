import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { arrowUp } from '../../assets';
import { theme } from "../../theme";

const ScrollToTop = () => {
	const [showScroll, setShowScroll] = useState(false);
	const [bottom, setBottom] = useState(1);

	const checkScrollOffset = () => {
		// show or hide
		if (!showScroll && window.pageYOffset > 400){
			setShowScroll(true)
		} else if (showScroll && window.pageYOffset <= 400){
			setShowScroll(false)
		}

		// set bottom offset
		if (document.body.scrollHeight - (window.pageYOffset + window.innerHeight) < 68.5) {
			setBottom(7);
		} else if (bottom !== 1) {
			setBottom(1);
		}
	};

	const scrollTop = () =>{
		window.scrollTo({top: 0, behavior: 'smooth'});
	};

	window.addEventListener('scroll', checkScrollOffset);

	return (
		<StyledScrollToTop onClick={scrollTop}
			style={{display: !showScroll && 'none'}}
			aria-label='Scroll to top'
			bottom={bottom}
		>
			<img loading='lazy' src={arrowUp} alt='Scroll to top' title='Scroll to top'/>
		</StyledScrollToTop>
	)
}

const fadeIn = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 0.5;
	}
`

const fadeInCss = css`
	animation: ${fadeIn} .3s;
`

const StyledScrollToTop = styled.button<{bottom: number}>`
	${fadeInCss};
	align-items: center;
	background-color: transparent;
	background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
	border-width: 0;
	border-radius: 50%;
	bottom: ${({bottom}) => bottom}em;
	box-shadow: 0 4px 10px 0 ${theme.color.colorsLayoutShadows};
	cursor: pointer;
	justify-content: center;
	opacity: .5;
	padding: 1em;
	position: fixed;
	right: .6em;
	transition: all .4s;
	z-index: 40;

	&:hover{
		opacity: 1;
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		right: 2.5em;
	}

	@media (min-width: ${theme.breakpoints.wide}) {
		bottom: 2em;
	}
`

export default ScrollToTop;
