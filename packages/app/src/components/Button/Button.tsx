import styled, { css, keyframes } from "styled-components";
import { theme } from "../../theme";
// import { Link } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

export interface ButtonProps {
	disabled?: boolean;
	styling?: "purple" | "green" | "white" | "link" | "white_borderless";
	symbol?: boolean;
	width?: string;
	onClick?: () => void;
}

const showAndHide = keyframes`
	0% {
		opacity: 0;
	}
	40% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
`

// TODO: any => ButtonProps
const Button = styled.button<any>`
	&{
		border-width: 1px;
		border-style: solid;
		border-radius: 8px;
		box-shadow: ${props => (!props.disabled && props.styling !== "link") && `0 4px 10px 0 ${theme.color.colorsLayoutShadows}`};
		cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
		font-family: ${props => props.styling === "link" ? theme.font.inter : theme.font.spaceMace};
		font-size: ${props => props.symbol ? "clamp(1.4rem, 2.65vw, 2rem)" : "clamp(.9rem, 2vw, 1rem)"};
		font-weight: ${props => props.styling !== "link" && "bold"};
		text-align: center;
		text-transform: ${props => props.styling !== "link" && "uppercase"};
		opacity: ${props => props.disabled && .5};
		padding: ${props => props.symbol ? ".22em 0" : ".75em 1.5em"};
		position: relative;
		transition: all .4s;
		width: ${props => props.width && props.width};
	}

	&:focus-visible {
		outline: none;
		box-shadow: ${props => (!props.disabled && props.styling !== "link") && `0px 0px 10px 5px ${theme.color.purple[600]}`};
		filter: ${props => (!props.disabled && props.styling === "link") && `drop-shadow(2px 2px 3px ${theme.color.purple[600]})`};
	}

	&[aria-label]:not([aria-label=""]) {
		&::after {
			background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
			border-radius: 8px;
			color: ${theme.color.white};
			content: attr(aria-label);
			font-family: ${theme.font.inter};
			font-size: 0.4em;
			left: 50%;
			opacity: 0;
			position: absolute;
			bottom: 100%;
			padding: .2em .3em;
			transition: opacity .4s ease-in;
			transform: translateY(-.2em) translateX(-50%);
			z-index: 1;
		}

		&:hover::after {
			animation: 2s ${showAndHide} ease-out;
		}
	}


	${({disabled}) => disabled && `
		pointer-events: none;
	`}

	${({styling}) => styling === "purple" && `
		background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
		border-color: transparent;
		color: ${theme.color.white};

		&:hover {
			background-image: unset;
			border-color: ${theme.color.purple[600]};
			color: ${theme.color.purple[600]};
		}
	`}

	${({styling}) => styling === "white" && `
		background-image: linear-gradient(${theme.color.white}, ${theme.color.white});
		border-color: ${theme.color.purple[600]};
		color: ${theme.color.purple[600]};

		&:hover {
			background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
			border-color: transparent;
			color: ${theme.color.white};
		}
	`}

	${({styling}) => styling === "white_borderless" && `
		background-color: ${theme.color.white};
		border-color: transparent;
		color: ${theme.color.purple[600]};
	`}

	${({styling}) => styling === "green" && `
		background-image: linear-gradient(to bottom, ${theme.color.green[100]}, ${theme.color.green[200]});
		border-color: transparent;
		color: ${theme.color.purple[800]};

		&:hover {
			background-image: linear-gradient(to bottom, #aa6cd6 -100%, ${theme.color.purple[600]});
			color: ${theme.color.white};
		}
	`}

	${({styling}) => styling === "link" && `
		background-color: transparent;
		border-color: transparent;
		color: ${theme.color.purple[600]};
		text-decoration: underline;

		&:hover {
			color: ${theme.color.purple[700]};
		}
	`}
`;

export interface ButtonLinkProps {
	light?: string;
}

export const buttonLinksStyling = css<ButtonLinkProps>`
	background-color: ${props => props.light && props.theme.color.white};
	background-image: ${props => !props.light && `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})`};
	border-color: ${props => props.light ? props.theme.color.purple[600] : 'transparent'};
	border-radius: 8px;
	border-style: solid;
	border-width: 1px;
	box-shadow: ${props => !props.light && `0 4px 10px 0 ${theme.color.colorsLayoutShadows}`};
	color: ${props => props.light ? props.theme.color.purple[600] : props.theme.color.white};
	font-family: ${props => props.theme.font.spaceMace};
	padding: .75em 1.5em;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: .2s all ease-in;

	&:hover {
		background-image: ${props => props.light ? `linear-gradient(to bottom, #aa6cd6 -100%, ${props.theme.color.purple[600]})` : "unset"};
		background-color: ${props => !props.light && props.theme.color.white};
		border-color: ${props => !props.light && props.theme.color.purple[600]};
		color: ${props => props.light ? props.theme.color.white : props.theme.color.purple[600]};
		box-shadow: 0 4px 10px 0 ${theme.color.colorsLayoutShadows};
	}

	&:focus-visible {
		filter: drop-shadow(2px 2px 3px ${theme.color.purple[600]});
		outline: none;
	}
`

export const ButtonLink = styled(Link)<ButtonLinkProps>`
	${buttonLinksStyling}
`

export default Button;
