import React, { useContext } from "react";
import styled from "styled-components";
import { Button, Spacer, Title, Text } from '../../../../../components';
import { theme } from '../../../../../theme';
import { PepemonProviderContext } from '../../../../../contexts';
import { usePepemonApi, useIsClaimedMerkle, useClaimMerkle } from '../../../../../hooks';

interface CardToClaimProps {
	title: string,
	text: string,
	img: {
		url: string,
		title: string
	}
	tokenId: number
}

const CardToClaim: React.FC<CardToClaimProps> = ({title, text, tokenId, img}) => {
	const merkleType = 'distributor';
	const [pepemon] = useContext(PepemonProviderContext);
	const { account } = pepemon;
	const { response, isFetching } = usePepemonApi(`/merkle/${tokenId}/${account}`);
	const canClaim = response && response.index;

	// @dev for more info: https://etherscan.io/address/0x78a285dcd2AD742d8D4ACC33C3a279f44d842e13#readContract
	const isClaimed = useIsClaimedMerkle( (response && response.index) &&
		response.index,
		merkleType,
		tokenId,
	);

	// @dev for more info: https://etherscan.io/address/0x78a285dcd2AD742d8D4ACC33C3a279f44d842e13#writeContract
	const { onClaimMerkle, isClaiming } = useClaimMerkle( response && response.index ? {
		account,
		index: response.index,
		amount: parseInt(response.amount),
		proof: response.proof,
	} : null, merkleType, tokenId);

	const isDisabled = !account || isFetching || isClaimed || !canClaim || isClaiming;

	return (
		<CardToClaimWrapper isDisabled={isDisabled}>
			<Title as="h3" size='xxs' weight={900} font={theme.font.neometric}>{title}</Title>
			<Spacer size="sm"/>
			<StyledFigure>
			  <img loading='lazy' src={img.url} alt={img.title} title={img.title}/>
			  <figcaption><Text as="p" size='s' lineHeight={1.125} align="center" color={theme.color.gray[300]}>{text}</Text></figcaption>
			</StyledFigure>
			<Spacer size="sm"/>
			<Button width="100%" styling="purple" style={{marginTop: "auto"}}
			onClick={onClaimMerkle} disabled={isDisabled}
			>{
				isFetching ? 'Checking...'
				: isClaimed ? 'Already claimed'
				: isClaiming ? 'Claiming...'
				: canClaim ? 'Claim' : "Can't claim"
			}</Button>
		</CardToClaimWrapper>
	)
}

const CardToClaimWrapper = styled.div<{isDisabled: boolean}>`
	display: flex;
	flex-direction: column;
	height: 100%;

	:not(button) {
		opacity: ${props => props.isDisabled && '.5'};
	}
`

const StyledFigure = styled.figure`
	margin: 0;
`

export default CardToClaim;
