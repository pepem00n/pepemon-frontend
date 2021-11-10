import React from "react";
import styled from "styled-components";
import { coin } from "../../../assets";
import { Title, Spacer, StyledSpacer } from "../../../components";
import { StyledPepemonCardMeta, StyledPepemonCardPrice } from "../components";
import { theme } from "../../../theme";

const PackSingle : React.FC<any> = ({packId, selectedPack, selectPack, chainId, packMeta}) => {

	return (
		<StyledPepemonCard>
			<StyledPepemonCardPrice>
				<img loading="lazy" src={coin} alt="coin"/>
				{packMeta.price} {chainId === 56 ? 'BNB' : 'PPDEX'}
			</StyledPepemonCardPrice>
			<div>
				<StyledPepemonCardImage loading="lazy" active={packMeta === selectedPack} src={packMeta.url} alt={packMeta.name}
					onClick={() => selectPack(packMeta)}/>
				<Title as="h4" font={theme.font.neometric}>{packMeta.name}</Title>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<Spacer size="sm"/>
				<StyledPepemonCardMeta>
					<dt>Minted</dt>
					<dd>{packMeta.minted}</dd>
				</StyledPepemonCardMeta>
				<StyledPepemonCardMeta>
					<dt>Time</dt>
					<dd>{packMeta.time}</dd>
				</StyledPepemonCardMeta>
			</div>
		</StyledPepemonCard>
	)
}

const StyledPepemonCard = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	&:hover {
		cursor: pointer;
	}
`

export const StyledPepemonCardImage = styled.img<{active?: boolean}>`
	filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
	height: auto;
	max-width: 25em;
	position: relative;
	width: 100%;
	z-index: 0;

	&:hover {
		cusror: pointer;
	}

	${({ active }) => active && `
		&{
			filter: drop-shadow(0 0 50px #894fbe);
		}
	`}
`

export default PackSingle;
