import React, {
	// useContext
} from "react";
// import styled from "styled-components";
import { StyledStoreBody,
	// StyledPepemonCardMeta, StyledPepemonCardPrice
} from './index';
import { Button, Title, Text, Spacer,
	// StyledSpacer
} from '../../../components';
// import { PepemonProviderContext } from '../../../contexts';
import { StoreAside } from '../components';
// import { ProgressBar } from '../../../components';
// import { coin } from '../../../assets';
import { useModal } from '../../../hooks';
import { theme } from '../../../theme';

const StorePacksAside: React.FC<any> = ({setSelectedPack, selectedPack}) => {
	// const [pepemon] = useContext(PepemonProviderContext);
	// const { chainId } = pepemon;

	const [handlePresent] = useModal({
		title: 'Claim this deck',
		modalActions: [
			{
				text: 'Not available (yet)',
				buttonProps: {
					disabled: true,
					styling: 'purple',
					width: '100%'
				}
			}
		]
	});

	return (
		<StoreAside close={() => setSelectedPack(null)} title="Selected Pack">
			<StyledStoreBody>
				<Title as="h2" font={theme.font.neometric} size='m'>{selectedPack.name}</Title>
				<Spacer size="sm"/>
				<Text as="p" font={theme.font.inter} size='s' lineHeight={1.3} color={theme.color.gray[600]}>When claiming this boosterpack you will recieve {selectedPack.cardsPerPack} random cards.</Text>
				<Spacer size="sm"/>
				<img loading="lazy" src={selectedPack.url} alt={selectedPack.name} style={{width: "100%"}}/>
				<Spacer size='md'/>
				{/*
					<StyledPepemonCardMeta>
						<dt>Rarity:</dt>
						<dd>Epic</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Type:</dt>
						<dd>Collectors edition</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Set:</dt>
						<dd>New beginning</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Artist:</dt>
						<dd>Azucena N.A.</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Price:</dt>
						<dd>
							<StyledPepemonCardPrice styling="alt">
								<img loading="lazy" src={coin} alt="coin"/>
								{selectedPack.price} {chainId === 56 ? 'BNB' : 'PPDEX'}
							</StyledPepemonCardPrice>
						</dd>
					</StyledPepemonCardMeta>
					<Spacer size='md'/>
					<Text as="p" font={theme.font.inter} size='xs' color={theme.color.gray[300]} spacing={1.2} txtTransform="uppercase">Chances of getting this card:</Text>
					<Spacer size='sm'/>
					<ProgressBar percent={60}/>
					<Spacer size='md'/>
				*/}
				<Button disabled styling="purple" onClick={() => handlePresent() } width="100%">Not available (yet)</Button>
			</StyledStoreBody>
		</StoreAside>
	)
}

export default StorePacksAside;
