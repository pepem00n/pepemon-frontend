import React, { useState, useContext } from "react";
import { StoreAside, StyledStoreBody, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, ExternalLink, Title, Text, Spacer, StyledSpacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreClaimModal } from '../components';
import { getDisplayBalance } from "../../../utils";
import { cardback_normal, coin } from '../../../assets';
import { useAllowance, useTokenBalance, useRedeemCard, useApprove } from "../../../hooks";
import { theme } from '../../../theme';

const StoreCardsAside: React.FC<any> = ({setSelectedCard, selectedCard: { cardId, cardPrice, cardMeta = null, cardBalance = null }}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);
	const [transactions, setTransactions] = useState(0);
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId, contracts } = pepemon;
	const { onRedeemCard, isRedeemingCard } = useRedeemCard(contracts.pepemonStore);
	const { onApprove, isApproving } = useApprove(contracts.pepemonStore, contracts.ppdex);
	const allowance = useAllowance(contracts.pepemonStore);
	const ppdexBalance = useTokenBalance(contracts.ppdex.address);
	if (cardMeta.status === "failed") { setSelectedCard(null); return <></> } // bail out early if card infos couldn't be loaded

	const isItemCard = (tokenId: number) => {
        return [17, 18, 19].includes(tokenId);
    }

    const daysForSale = () => {
        if (isItemCard(cardId)) {
            return 1000000
        }
        return cardId > 5 ? (cardId > 12 ? 28 : 21) : 14;
    }

	const isAllowedSpending = () => {
        // No allowance needed for native BNB payments
        if (chainId === 56) { return true; }
		return cardPrice?.comparedTo(allowance) === -1;
    }

	const isMintable = () => {
        return cardBalance && (parseFloat(cardBalance.totalSupply) < parseFloat(cardBalance.maxSupply));
    }

	const isAffordable = () => {
        if (cardPrice?.isEqualTo(ppdexBalance)) { return true; }
        return cardPrice?.comparedTo(ppdexBalance) === -1;
    }

	const isReleasingSoon = () => {
        const birthdayMetaData = cardMeta.attributes.find(attribute => attribute.trait_type === 'birthday');
		if (parseFloat(birthdayMetaData.value) === 0) return true;
        return parseFloat(birthdayMetaData.value) > (Date.now() / 1000);
    }

	const isForSale = () => {
        const birthdayMetaData = cardMeta.attributes.find(attribute => attribute.trait_type === 'birthday');
		if (parseFloat(birthdayMetaData.value) === 0) return false;
		return (parseFloat(birthdayMetaData.value) + (daysForSale() * 24 * 60 * 60)) > (Date.now() / 1000)
    }

	const isNoLongerForSale = () => {
		return !isForSale() && !isReleasingSoon();
	}

	const isSoldOut = () => {
        return (!isMintable() && !isReleasingSoon()) || (isNoLongerForSale());
    }

	const priceOfCard = cardPrice && parseFloat(getDisplayBalance(cardPrice, 18)).toFixed(2);

	const buttonProps = () => {
		if (isSoldOut() || isNoLongerForSale()) {
			return { disabled: true, onClick: () => null, text: 'Not available' }
		} else if (isAllowedSpending()) {
			if (isReleasingSoon()) {
				return { disabled: true, onClick: () => null, text: 'Available soon' }
			} else if (!isAffordable()) {
				return { disabled: true, onClick: () => null, text: 'Not enough balance' };
			} else {
				return { disabled: isRedeemingCard ? true : false, onClick: () => setActiveClaimModal(true), text: isRedeemingCard ? 'Claiming...' : 'Claim card' }
			}
		} else {
			return { disabled: false, onClick: () => !isApproving && onApprove(), text: isApproving ? 'Enabling...' : 'Enable' }
		}
	}

	return (
		<>
			<StoreAside close={() => setSelectedCard("")} title="Selected Card">
				<StyledStoreBody>
					<Title as="h2" font={theme.font.neometric} size='m'>{cardMeta ? cardMeta.name : 'Loading card'}</Title>
					<Spacer size="sm"/>
					<Text as="p" font={theme.font.inter} size='s' lineHeight={1.3} color={theme.color.gray[600]}>{cardMeta && cardMeta.description}</Text>
					<Spacer size="sm"/>
					<img loading="lazy" src={cardMeta ? cardMeta.image : cardback_normal} alt={cardMeta ? cardMeta.name : 'Loading card'} style={{width: "100%"}}/>
					<Spacer size='md'/>
					<StyledPepemonCardMeta>
						<dt>Rarity:</dt>
						<dd>{cardMeta && cardMeta.attributes.find((trait) => trait.trait_type === 'Rarity').value}</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Type:</dt>
						<dd>{cardMeta && cardMeta.attributes.find((trait) => trait.trait_type === 'Type').value}</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Set:</dt>
						<dd>{cardMeta && cardMeta.attributes.find((trait) => trait.trait_type === 'Set').value}</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Artist:</dt>
						<dd>{cardMeta && cardMeta.attributes.find((trait) => trait.trait_type === 'Artist').value}</dd>
					</StyledPepemonCardMeta>
					<Spacer size='sm'/>
					<StyledSpacer bg={theme.color.gray[100]} size={2}/>
					<StyledPepemonCardMeta>
						<dt>Price:</dt>
						<dd>
							<StyledPepemonCardPrice styling="alt">
								<img loading="lazy" src={coin} alt="coin"/>
								{cardPrice ? `${priceOfCard} ${chainId === 56 ? 'BNB' : 'PPDEX'}` : 'loading'}
							</StyledPepemonCardPrice>
						</dd>
					</StyledPepemonCardMeta>
					<Spacer size='md'/>
					<ExternalLink style={{ width: '100%' }} href={chainId === 137 ? `https://quickswap.exchange/#/swap?outputCurrency=${contracts.ppdex.address}` :
					chainId === 56 ? 'https://www.binance.com/en/trade/BNB_ETH' : `https://app.uniswap.org/#/swap?outputCurrency=${contracts.ppdex.address}`}>
						Buy {chainId === 56 ? 'BNB' : 'PPDEX'}
					</ExternalLink>
					<Spacer size='md'/>
					<Button width="100%" styling="purple"
						disabled={buttonProps().disabled}
						onClick={buttonProps().onClick}>
							{buttonProps().text}
					</Button>
				</StyledStoreBody>
			</StoreAside>
			{ activeClaimModal &&
				<StoreClaimModal
				dismiss={() => setActiveClaimModal(false)}
				claimButtonText={isRedeemingCard ? 'Claiming...' : 'Claim card'}
				claimButtonClick={() => onRedeemCard(cardId, chainId === 56 ? priceOfCard.toString() : null).then(() => setTransactions(transactions + 1))}
				claimButtonDisabled={isRedeemingCard}
				/>
			}
		</>
	)
}

export default StoreCardsAside;
