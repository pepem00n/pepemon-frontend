import React, {useCallback,
	// useEffect, useState
} from 'react'
import styled from 'styled-components'
import { StyledSpacer, Spacer, Title } from '../../components';
import { CardMetadata, CardBalances } from '../../hooks';
import { coin } from '../../assets';
import { theme } from '../../theme';
import BigNumber from 'bignumber.js';
import {getDisplayBalance} from '../../utils/formatBalance';
import {getCardInfo} from '../../utils/nftCards';

interface PepemonCardProps {
	active: boolean;
    pepemon: any;
    ppdexBalance: any;
	tokenId: number;
	metadata: CardMetadata;
	balances: CardBalances;
	price: BigNumber;
	allowance:  any;
	transactions: number;
    setTransactions: any;
    setDelayApprove: any;
    setImageModal: any;
    onRedeemCard: (tokenId: number, amount?: string) => Promise<void>;
    isRedeemingCard: Array<string | boolean> | number;
    token?: {name: string, decimals: number};
    providerChainId?: number;
	selectCard: () => void;
}

const PepemonCard: React.FC<any> = ({
									 active,
                                     pepemon,
                                     ppdexBalance,
                                     tokenId,
                                     metadata,
                                     balances,
                                     price,
                                     allowance,
                                     transactions,
                                     setTransactions,
                                     setDelayApprove,
                                     setImageModal,
                                     onRedeemCard,
                                     isRedeemingCard,
                                     token,
                                     providerChainId,
									 setSelectedCard
}) => {
    const isItemCard = (cardId: number) => {
        return [17, 18, 19].includes(cardId);
    }

    const daysForSale = useCallback(() => {
        if (isItemCard(tokenId)) {
            return 1000000
        }
        return tokenId > 5 ? (tokenId > 12 ? 28 : 21) : 14;
    }, [tokenId])

    const isMintable = () => {
        return balances && (parseFloat(balances.totalSupply) < parseFloat(balances.maxSupply));
    }
    const isAffordable = () => {
        if (price.isEqualTo(ppdexBalance)) {
            return true;
        }
        return price.comparedTo(ppdexBalance) === -1;
    }
    const isAllowedSpending = () => {
        // No allowance needed for native BNB payments
        if (providerChainId === 56) {
            return true;
        }
        return price.comparedTo(allowance) === -1;
    }

	const isReleasingSoon = useCallback(() => {
        const birthdayMetaData = metadata.attributes.find(attribute => attribute.trait_type === 'birthday');
        if (parseFloat(birthdayMetaData.value) === 0) {
            return true;
        }
        return parseFloat(birthdayMetaData.value) > (Date.now() / 1000);
    }, [metadata.attributes])

    const isForSale = () => {
        const birthdayMetaData = metadata.attributes.find(attribute => attribute.trait_type === 'birthday');
        if (parseFloat(birthdayMetaData.value) === 0) {
            return false;
        }
        return (parseFloat(birthdayMetaData.value) + (daysForSale() * 24 * 60 * 60)) > (Date.now() / 1000)
    }
    const isSoldOut = () => {
        return (!isMintable() && !isReleasingSoon()) || (!isForSale() && !isReleasingSoon());
    }
    const isNoLongerForSale = () => {
        return !isReleasingSoon() && !isForSale()
    }

    // const calculateTimeLeft = useCallback(() => {
    //     const birthdayMetaData = metadata.attributes.find(attribute => attribute.trait_type === 'birthday');
    //     if (parseFloat(birthdayMetaData.value) === 0) {
    //         return 0;
    //     }
	//
    //     if (isReleasingSoon()) {
    //         return parseFloat(birthdayMetaData.value) - (Date.now() / 1000);
    //     }
	//
    //     if ((parseFloat(birthdayMetaData.value) + (daysForSale() * 60 * 60 * 24)) - (Date.now() / 1000) <= 0) {
    //         return 0;
    //     }
    //     return (parseFloat(birthdayMetaData.value) + (daysForSale() * 60 * 60 * 24)) - (Date.now() / 1000);
    // }, [metadata.attributes, isReleasingSoon, daysForSale])

    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 60000)
	//
    //     return () => {
    //         clearInterval(timer)
    //     }
    // }, [calculateTimeLeft]);

    // const countdown = (pre: string = ' ', after: string = '', fontSize?: number) => {
    //     const days = timeLeft / (60 * 60 * 24);
	//
    //     if (days > 1) {
    //         return (<span>
    //             {Math.ceil(days).toFixed(0)}{pre} {Math.ceil(days).toFixed(0) === '1' ? 'day' : 'days'} {after}
    //         </span>);
    //     }
	//
    //     const hours = timeLeft / (60 * 60);
    //     if (hours > 1) {
    //         return (<span style={{fontSize: fontSize ? `${fontSize}px` : '55px'}}>
    //             {Math.ceil(hours).toFixed(0)}{pre} {Math.ceil(hours).toFixed(0) === '1' ? 'hour' : 'hours'} {after}
    //         </span>);
    //     }
	//
    //     const minutes = timeLeft / 60;
	//
    //     if (minutes <= 0) {
    //         return null;
    //     }
    //     return (<span style={{fontSize: fontSize ? `${fontSize}px` : '50px'}}>
    //         {minutes.toFixed(0)}{pre} {minutes.toFixed(0) === '1' ? 'minute' : 'minutes'} {after}
    //     </span>);
    // }
    const isRedeemingThisCard = isRedeemingCard && isRedeemingCard[0] === tokenId && isRedeemingCard[1];
    const priceOfCard = parseFloat(getDisplayBalance(price, token ? token.decimals : 18)).toFixed(2);

    return (
		<StyledPepemonCard style={{ opacity: isSoldOut() ? "50%" : "100%" }}>
			<StyledPepemonCardPrice>
				{parseFloat(priceOfCard) === 0 ? "Unavailable" :
					<>
						<img loading="lazy" src={coin} alt="coin"/>
						{priceOfCard} PPDEX
					</>
				}
			</StyledPepemonCardPrice>
			<div>
				<StyledPepemonCardImage loading="lazy" active={active} src={isReleasingSoon() ? getCardInfo(0).img : metadata.image} alt={isReleasingSoon() ? 'Coming soon' : metadata.name} onClick={() => setSelectedCard({
					tokenId: tokenId,
					token: token,
					priceOfCard: priceOfCard,
					title: metadata.name,
					description: metadata.description,
					image: metadata.image,
					rarity: metadata.attributes[1],
					type: metadata.attributes[4],
					set: metadata.attributes[0],
					artist: metadata.attributes[3],
					isSoldOut: isSoldOut,
					isAllowedSpending: isAllowedSpending,
					isRedeemingCard: isRedeemingCard,
					isRedeemingThisCard: isRedeemingThisCard,
					isAffordable: isAffordable,
					isReleasingSoon: isReleasingSoon,
					isMintable: isMintable,
					isNoLongerForSale: isNoLongerForSale,
					setDelayApprove: setDelayApprove,
					onRedeemCard: onRedeemCard,
					setTransactions: setTransactions,
				})}/>
				<Title as="h4" size='xxs' font={theme.font.neometric}>{isReleasingSoon() ? 'Coming soon' : metadata.name}</Title>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<Spacer size="sm"/>
				<StyledPepemonCardMeta>
					<dt>Minted</dt>
					<dd>{isReleasingSoon() ? '0 / 0' : `${balances.totalSupply} / ${parseFloat(balances.maxSupply) > 10000 ? '∞': balances.maxSupply}`}</dd>
				</StyledPepemonCardMeta>
				<StyledPepemonCardMeta>
					<dt>Time</dt>
					<dd>24 hours</dd>
				</StyledPepemonCardMeta>
			</div>
		</StyledPepemonCard>
    )
}

// NEW
const StyledPepemonCard = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;

	&:hover {
		cursor: pointer;
	}
`

export const StyledPepemonCardPrice = styled.span<{styling?: string}>`
	& {
		background-color: ${props => props.styling === 'alt' ? props.theme.color.white : props.theme.color.black};
		color: ${props => props.styling === 'alt' ? props.theme.color.black : props.theme.color.white};
		font-family: ${props => props.theme.font.spaceMace};
		border-radius: 6px;
		display: inline-flex;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
		padding: ${props => props.styling === 'alt' ? '' : '2px 8px'};
		font-size: ${props => props.styling === 'alt' ? '1rem' : '.8rem'};
		transform: ${props => props.styling === 'alt' ? '' : 'translateY(40%)'};
		position: relative;
		z-index: 1;
	}

	& img {
		width: 1.8em;
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

export const StyledPepemonCardMeta = styled.dl`
	&{
		display: flex;
		font-family: ${props => props.theme.font.inter};
		justify-content: space-between;
		margin-bottom: 0;
		margin-top: 0;
	}

	& dt, dd {
		font-size: .8rem;
		margin-top: .5em;
	}

	& dt {
		color: ${props => props.theme.color.gray[300]};
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	& dd {
		color: ${props => props.theme.color.gray[600]};
		font-weight: bold
	}
`

export default PepemonCard;
