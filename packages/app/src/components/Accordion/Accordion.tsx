import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Title } from '../../components';
import { theme } from '../../theme';
import { pokeball, uparrow, dropdownarrow } from '../../assets';

interface AccordionProps {
	title: string,
	isOpen?: boolean,
	children: any
}

const Accordion: React.FC<AccordionProps> = ({title, isOpen = true, children}) => {
	const [openAccordion, setOpenAccordion] = useState(isOpen);
	const toggleAccordion = () => {
		setOpenAccordion(!openAccordion)
	}

	return (
		<AccordionWrapper isOpen={openAccordion}>
			<AccordionHeader onClick={toggleAccordion} isOpen={openAccordion}>
				<AccordionHeaderTitle>
					<img loading="lazy" src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
					<Title as="h2" color={openAccordion ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>{title}</Title>
				</AccordionHeaderTitle>
				<AccordionHeaderButton onClick={toggleAccordion}>
						<span>Show {openAccordion ? "less" : "more"}</span>
						<img loading="lazy" src={openAccordion ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButton>
			</AccordionHeader>
			<AccordionBody isOpen={openAccordion}>
				{children}
			</AccordionBody>
		</AccordionWrapper>
	)
}

export const AccordionGroup = styled.section`
	display: flex;
	flex-direction: column;
`

export const AccordionWrapper = styled.div<{isOpen: boolean}>`
	background-color: ${theme.color.purple[800]};
	border-radius: ${theme.borderRadius}px;
	margin-bottom: .5em;
	outline: ${props => props.isOpen && `2px solid ${props.theme.color.green[200]}` };
	width: 100%;
`

export const AccordionHeader = styled.div<{isOpen: boolean}>`
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em);
`

export const AccordionHeaderTitle = styled.div`
	display: flex;
	align-items: center;
`

export const AccordionHeaderButton = styled.button`
	align-items: center;
	background-color: ${theme.color.transparent};
	border: none;
	border-radius: 8px;
	color: ${theme.color.white};
	cursor: pointer;
	display: flex;
	font-family: ${theme.font.neometric};
	font-size: 0.75rem;

	img {
		margin-left: .7em;
	}

	&:focus-visible {
		outline: none;
		box-shadow: 0px 0px 10px 5px ${theme.color.purple[600]};
	}

	span {
		display: none;

		@media (min-width: ${theme.breakpoints.tabletP}) {
			display: inline;
		}
	}
`

export const AccordionBody = styled.div<{isOpen: boolean}>`
	background-color: ${theme.color.white};
	border-bottom-left-radius: ${theme.borderRadius}px;
	border-bottom-right-radius: ${theme.borderRadius}px;
	display: ${props => props.isOpen ? 'flex' : 'none'};
	flex-direction: column;
	justify-content: space-between;
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em) 2em;

	@media (min-width: ${theme.breakpoints.tabletP}) {
		flex-direction: row;
	}
`

export const AccordionBodyContent = styled.div<{side: "left" | "right"}>`
	@media (min-width: ${theme.breakpoints.tabletP}) {
		border-left: ${props => props.side === "right" && `2px solid ${theme.color.colorsLayoutBorders}`};
		padding-left: ${props => props.side === "right" && "5.5em"};
		padding-right: ${props => props.side === "left" ? "5.5em" : "2.5em"};
	}
`

export default Accordion;
