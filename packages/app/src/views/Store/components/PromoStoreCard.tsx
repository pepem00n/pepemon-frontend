import React, {useRef, useState} from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { PepemonCard, Card, Spacer, Button } from '../../../components';
import { CardMetadata, CardBalances, CardPrice, useRedeemCard, useOutsideClick }  from '../../../hooks';
import { getDisplayBalance } from '../../../utils';
import { getPepemonPromoStoreContract } from '../../../pepemon/utils';

interface StakeCardProps {
    pepemon: any,
    promoBalance: any;
    cardsMetadata: CardMetadata[],
    cardsBalances: CardBalances[],
    cardsPrice: CardPrice[],
    allowance: any,
    onApprove(): Promise<any>,
    isApproving: boolean,
    transactions: number;
    setTransactions: any;
    promo: any,
}

const PromoStoreCard: React.FC<StakeCardProps> = ({
                                                 pepemon,
                                                 promoBalance,
                                                 cardsMetadata,
                                                 cardsBalances,
                                                 cardsPrice,
                                                 allowance,
                                                 onApprove,
                                                 isApproving,
                                                 transactions,
                                                 setTransactions,
                                                 promo,
                                             }) => {
    const [delayApprove, setDelayApprove] = useState(false)
    const [imageModal, setImageModal] = useState(null);
    const { onRedeemCard, isRedeemingCard } = useRedeemCard(getPepemonPromoStoreContract(pepemon));
    const isAllowedSpending = () => {
        return new BigNumber(100000000000000000000).comparedTo(allowance) === -1;
    }

    const ref = useRef();
    useOutsideClick(ref, () => {
        if (imageModal !== null) {
            setImageModal(null);
        }
    })

    return (
        <StyledCardWrapper>
            <Card>
                <StyledCardHead>
                    <StyledTitle size="l">Promotional Editions</StyledTitle>
                    <div style={{fontSize: '24px'}}>Your balance: <b>{getDisplayBalance(promoBalance, promo.decimals)}</b> ${promo.token}</div>
                </StyledCardHead>
                <StyledCardContent>
                    {(!isAllowedSpending() && !delayApprove) &&
                    <StyledOverlay>
                      <StyledOverlayTitle>Approve {promo.token} spending in shop</StyledOverlayTitle>
                      <Spacer size="md"/>
                      <StyleOverlayButtonContainer>
                        <Button styling="purple" disabled={isApproving} onClick={() => onApprove().then(() => setDelayApprove(true))}>{isApproving ? 'Approving...' : 'Approve now'}</Button>
                        <Spacer size="lg"/>
                        <Button styling="white" disabled={isApproving} onClick={() => setDelayApprove(true)}>Just look around</Button>
                      </StyleOverlayButtonContainer>
                    </StyledOverlay>
                    }
                    { imageModal !== null &&
                    <StyledOverlay>
                      <img alt="placeholder" ref={ref} height="600" src={imageModal}/>
                    </StyledOverlay>
                    }
                    <StyledTitle size="m">{promo.name}</StyledTitle>
                    <StyledPepemonCardsWrapper>
                        {
                            cardsMetadata
                                .filter((metaData) => promo.cards.includes(metaData.tokenId))
                                .map((cardMetadata, index) => {
                                    const cardPrice = cardsPrice.find((price) => price.tokenId === cardMetadata.tokenId);
                                    return (
                                        <PepemonCard
                                            pepemon={pepemon}
                                            ppdexBalance={promoBalance}
                                            key={cardMetadata.tokenId}
                                            tokenId={cardMetadata.tokenId}
                                            metadata={cardMetadata}
                                            balances={cardsBalances.find(balance => balance.tokenId === cardMetadata.tokenId)}
                                            price={(cardPrice && cardPrice.price) || new BigNumber(0)}
                                            allowance={allowance}
                                            transactions={transactions}
                                            setTransactions={setTransactions}
                                            setDelayApprove={setDelayApprove}
                                            setImageModal={setImageModal}
                                            onRedeemCard={onRedeemCard}
                                            isRedeemingCard={isRedeemingCard}
                                            token={{name: promo.token, decimals: promo.decimals}}
                                        />
                                    );
                                })
                        }
                    </StyledPepemonCardsWrapper>
                </StyledCardContent>
            </Card>
        </StyledCardWrapper>
    );
}

interface StyledTitleProps {
    size: 'm' | 'l';
}

const StyledCardHead = styled.div`
    background-color: ${(props) => props.theme.color[3]};
    padding: 1.5rem 3rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 450px) {
        flex-direction: column;
    }
`

const StyledCardWrapper = styled.div`
  width: 940px;
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
  padding: 0 3rem;
  @media (max-width: 880px) {
    max-width: 600px;
    padding: 0 2rem;
    flex-direction: column;
  }
  @media (max-width: 450px) {
    max-width: min-content;
    padding: 0 2rem;
    flex-direction: column;
  }
`

const StyledCardContent = styled.div`
    position: relative;
    padding: 1.5rem 3rem 0 3rem;
    background-color: #f1f1f1;
`

const StyledOverlay = styled.div`
    position: absolute;
    background-color: rgba(240, 233, 231, 0.9);
    width: 100%;
    top: 1.7rem;
    bottom: 2rem;
    margin: -1.5rem -3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10rem;
    z-index: 100;
`

const StyledOverlayTitle = styled.div`

    font-size: 60px;
    font-weight: 799;
    padding: 0 10rem;
    text-align: center;
    letter-spacing: 4px;
`

const StyleOverlayButtonContainer = styled.div`
    display: flex;
`

const StyledPepemonCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  // justify-content: space-between;
  @media (max-width: 880px) {
    justify-content: center;
  }
  @media (max-width: 450px) {
    justify-content: center;
  }
`

const StyledTitle = styled.h4<StyledTitleProps>`

  font-size: ${(props) => props.size === 'l' ? 36 : 30}px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 3px;
  @media (max-width: 880px) {
    text-align: center;
  }
`

export default PromoStoreCard
