import React from "react";
import styled from "styled-components";
import { AnimatedImg } from "../../components";
import { theme } from "../../theme";
import { downgreenarrow, pepertle, warpertle, rektoise } from "../../assets";

const Evolve = () => {
	return (
		<EvolveGrid>
			<EvolveImgWrapper>
				<EvolveImgContainer>
					<AnimatedImg style={{width: '75%'}} src={pepertle} alt="pepertle" />
				</EvolveImgContainer>
			</EvolveImgWrapper>
			<EvolveImgWrapper width="100%" margin="0 auto" transform="translateY(-30%)">
				<EvolveImgContainer left="50%" transform="translateX(-50%)">
					<EvolveArrow/>
					<AnimatedImg style={{width: '75%'}} src={warpertle} alt="warpertle" />
				</EvolveImgContainer>
			</EvolveImgWrapper>
			<EvolveImgWrapper width="100%" margin="0 0 0 auto" transform="translateY(-60%)">
				<EvolveImgContainer right="0%">
					<EvolveArrow/>
					<AnimatedImg style={{width: '75%'}} src={rektoise} alt="rektoise" />
				</EvolveImgContainer>
			</EvolveImgWrapper>
		</EvolveGrid>
	)
}

const EvolveGrid = styled.div`
	display: grid;
	height: 100%;
	position: relative;

	@media (max-width: ${theme.breakpoints.tabletP}) {
		margin-top: 2em;
	}

	@media (min-width: ${theme.breakpoints.tabletP}) {
		grid-auto-rows: 1fr;
		width: 250%;
	}
`

interface EvolveImgWrapperProps {
	width?: string;
	margin?: string;
	transform?: string
}

interface EvolveImgContainerProps {
	left?: string,
	transform?: string,
	right?: string
}

const EvolveImgContainer = styled.div<EvolveImgContainerProps>`
	// border: 1px dashed gray;
	// border-radius: 8px;

	@media (min-width: ${theme.breakpoints.tabletP}) {
		height: 100%;
		width: 28%;
		left: ${props => props.left && props.left};
		transform: ${props => props.transform && props.transform};
		right: ${props => props.right && props.right};
	}
`

const EvolveImgWrapper = styled.div<EvolveImgWrapperProps>`
	margin: ${props => props.margin && props.margin};

	&:not(:first-child) {
		@media (min-width: ${theme.breakpoints.tabletP}) {
			${EvolveImgContainer} {
				position: absolute;
			}
		}
	}

	@media (max-width: ${theme.breakpoints.tabletP}) {
		width: 75%;

		&:not(:first-child) {
			padding-top: 1.5em;
		}
		&:nth-child(2) {
			margin-left: 12.5%;
		}
		&:nth-child(3) {
			margin-left: 25%;
		}
	}

	@media (min-width: ${theme.breakpoints.tabletP}) {
		width: ${props => props.width && props.width};
		transform: ${props => props.transform && props.transform}
	}
`

const EvolveArrow = styled.img.attrs({
	alt: "downgreenarrow",
	loading: "lazy",
	src: downgreenarrow,
})`
	left: 65%;
	position: relative;
	transform: translateX(-230%) translateY(10%);
	z-index: 1;

	@media (min-width: ${theme.breakpoints.tabletP}) {
		left: 40%;
	}
`

export default Evolve;
