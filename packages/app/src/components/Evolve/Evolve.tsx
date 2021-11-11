import React from "react";
import styled from "styled-components/macro";
import { AnimatedImg } from "../../components";
import { theme } from "../../theme";
import { downgreenarrow, pepertle, warpertle, rektoise } from "../../assets";

const Evolve = () => {
	return (
		<>
			<EvolveGrid>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<AnimatedImg src={pepertle} alt="pepertle" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<EvolveArrow/>
						<AnimatedImg src={warpertle} alt="warpertle" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
				<EvolveImgWrapper>
					<EvolveImgContainer>
						<EvolveArrow/>
						<AnimatedImg src={rektoise} alt="rektoise" />
					</EvolveImgContainer>
				</EvolveImgWrapper>
			</EvolveGrid>
		</>
	)
}

const EvolveGrid = styled.div`
	display: grid;
	position: relative;

	@media (max-width: ${theme.breakpoints.tabletP}) {
		margin-top: 2em;
		margin-bottom: 2em;
	}

	@media (min-width: ${theme.breakpoints.tabletL}) {
		grid-auto-rows: 1fr;
		margin-bottom: 5em;
		width: 250%;
	}
`

interface EvolveImgWrapperProps {
	width?: string;
	margin?: string;
	transform?: string
}

interface EvolveImgContainerProps {
	absolute?: boolean,
	left?: string,
	transform?: string,
	right?: string
}

const EvolveImgContainer = styled.div<EvolveImgContainerProps>`
	position: relative;
	text-align: center;
	width: fit-content;
`

const EvolveImgWrapper = styled.div<EvolveImgWrapperProps>`
	margin: ${props => props.margin && props.margin};
	position: sticky;
	top: calc(${theme.topBarSize}px + 2em);

	&:first-child {
			margin-right: auto;
	}

	&:nth-child(2) {
		padding-top: ${theme.topBarSize}px;

			margin-left: auto;
			margin-right: auto;
	}

	&:nth-child(3) {
		padding-top: ${2*theme.topBarSize}px;

			margin-left: auto;
	}
`

const EvolveArrow = styled.img.attrs({
	alt: "downgreenarrow",
	loading: "lazy",
	src: downgreenarrow,
})`
	left: 0;
	position: absolute;
	top: -${theme.topBarSize}px;

	@media (max-width: ${theme.breakpoints.desktop}) {
		display: none;
	}
`

export default Evolve;
