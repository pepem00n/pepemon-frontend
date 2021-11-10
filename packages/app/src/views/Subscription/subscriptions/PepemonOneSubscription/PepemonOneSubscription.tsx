import React, { useState, useContext, useEffect } from 'react'
import BigNumber from 'bignumber.js';
import { Accordion, AccordionBodyContent, Spacer, Button, Text, ContentColumns, ContentColumn, ExternalLink } from '../../../../components';
import { PepemonProviderContext } from '../../../../contexts';
import { getCardMeta, useTokenBalance, useApprove, useAllowance, useLotteryMinLPTokens, useLotteryRewardCard, useLotteryLPBalance, useLotteryIsStaking, useLotteryHasClaimed, useLotteryStakingDeadline, useLotteryStakingStartblock, useLotteryClaim, useLotteryWithdraw, useLotteryStake, useBlock } from '../../../../hooks';
import { getPepemonLotteryContract, getPpdexAddress, getPpdexUniV2Contract, getUniV2PpdexAddress } from '../../../../pepemon/utils';
import { getBalanceNumber } from '../../../../utils';
import { cardback_normal } from '../../../../assets';
import { theme } from '../../../../theme';

const PepemonOneSubscription: React.FC<any> = () => {
	const [pepemon] = useContext(PepemonProviderContext);
    const ppdexUniV2Balance = useTokenBalance(getUniV2PpdexAddress(pepemon));
    const [transaction, setTransaction] = useState(0);
    const { onApprove, isApproving } = useApprove(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const { onLotteryStake, isJoining } = useLotteryStake();
    const { onLotteryWithdraw, isWithdrawing } = useLotteryWithdraw();
    const { onLotteryClaim, isClaiming } = useLotteryClaim();
    const blockNumber = useBlock();
    const lockedPeriod = 208000;
    const allowance = useAllowance(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const minLPTokens: BigNumber = useLotteryMinLPTokens();
    const isStaking = useLotteryIsStaking(transaction);
    const stakedBalance = useLotteryLPBalance(transaction);
    const rewardCard = useLotteryRewardCard();
	const [cardMeta, setCardMeta] = useState(null)
	useEffect(() => {(async () => {
			setCardMeta(await getCardMeta(parseFloat(rewardCard || 0 ), pepemon))
		})()
	}, [rewardCard, pepemon]);
    const stakingDeadline = useLotteryStakingDeadline();
    const stakingStart = useLotteryStakingStartblock(transaction);
    const hasClaimed = useLotteryHasClaimed(rewardCard, transaction);
    const lockedBlocks = (parseFloat(stakingStart) + lockedPeriod) - blockNumber;
    const canClaimCurrentCard = () => {
        return stakingDeadline > stakingStart;
    }

	return (
		<Accordion title='Pepemon One Subscription'>
			<AccordionBodyContent side="left">
				<Text as="p" size='s' lineHeight={1.125}>
					Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake these LP tokens and recieve a unique NFT every month. Your LP tokens will be locked for a minimum 32 days.
				</Text>
				<Spacer size="lg"/>
				<ContentColumns>
					<ContentColumn width="50%">
						<Text as="p" lineHeight={1}>PPDEX-ETH LP balance</Text>
						<Spacer size="sm"/>
						<Text as="p" size='xxl' weight={900} lineHeight={1} font={theme.font.neometric}>
							{parseFloat(getBalanceNumber(ppdexUniV2Balance).toString()).toFixed(2)}
						</Text>
						<Spacer size="md"/>
						<Text as="p" lineHeight={1}>PPDEX-ETH LP staked</Text>
						<Spacer size="sm"/>
						<Text as="p" size='xxl' weight={900} lineHeight={1} font={theme.font.neometric}>
							{parseFloat(getBalanceNumber(stakedBalance).toString()).toFixed(2)}
						</Text>
					</ContentColumn>
					<ContentColumn width="50%">
						<ExternalLink href={`https://app.uniswap.org/#/add/v2/ETH/${getPpdexAddress(pepemon)}`}>Provide PPDEX-ETH LP liquidity</ExternalLink>
					</ContentColumn>
				</ContentColumns>
				<Spacer size="md"/>
				{ isStaking &&
					<>
						<Text as="p" size='xxl' lineHeight={1.1} color={theme.color.purple[600]} weight={900} font={theme.font.neometric}>
							You have an active <wbr/>subscription!
						</Text>
						<Spacer size="md"/>
					</>
				}
					<div style={{ display: "inline-flex", flexDirection: "column" }}>
						{ !isStaking &&
							<>
								<Text as="p" size='s'>
									{ minLPTokens ?
										`${parseFloat(parseFloat((getBalanceNumber(minLPTokens) + 0.01).toString()).toPrecision(3))} PPDEX-ETH LP needed to subscribe` :
										'loading...'
									}
								</Text>
								<Spacer size="sm"/>
							</>
						}
						{allowance.comparedTo(minLPTokens) === -1 ?
							<Button disabled={isApproving} size="sm" styling="purple" onClick={onApprove}>
								{isApproving ? 'Approving...' : 'Approve LP'}
							</Button>
						: isStaking ?
							<Button disabled={isWithdrawing || (lockedBlocks > 0)} size="sm" styling="purple" onClick={() => onLotteryWithdraw().then(() => setTransaction(transaction + 1))}>
								{(lockedBlocks > 0) ? 'Locked' : isWithdrawing ? 'Unsubscribing...' : 'Unsubscribe'}
							</Button>
						:
							<Button disabled={(minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) || isJoining || isStaking} size="sm" styling="purple" onClick={() => onLotteryStake().then(() => setTransaction(transaction + 1))}>
								{isStaking ? 'Active' : (minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) ? 'Insufficient LP' : isJoining ? 'Staking...' : 'Subscribe & Stake LP'}
							</Button>
						}
					</div>
				<Spacer size="md"/>
			</AccordionBodyContent>

			<AccordionBodyContent side="right">
				<div>
					<Text as="p" size='xs' color={theme.color.gray[400]} txtTransform="uppercase">This months card:</Text>
					<Spacer size="md"/>
					<Text as="p" size='l' color={theme.color.headers} weight={900} font={theme.font.neometric}>{cardMeta ? cardMeta.name : 'Loading card title...'}</Text>
					<Spacer size="sm"/>
					<Text as="p" size='s' color={theme.color.headers}>
						{cardMeta ? cardMeta.description : 'Loading card description...'}
					</Text>
					<Spacer size="sm"/>
					<img src={cardMeta ? cardMeta.image : cardback_normal} alt={cardMeta ? cardMeta.name : 'Loading card...'}/>
					<Spacer size="md"/>
					{ isStaking ?
						<>
							{ canClaimCurrentCard() ?
								<Button disabled={hasClaimed || isClaiming} styling="purple" width="100%" onClick={() => onLotteryClaim().then(() => setTransaction(transaction + 1))}>
									{hasClaimed ? 'Already claimed' : (isClaiming ? 'Claiming...' : 'Claim card')}
								</Button>
								:
								<Button disabled styling="white_borderless" width="100%">
									Not eligible
								</Button>
							}
						</>
						:
						<Button disabled styling="white_borderless" width="100%">
							Subscribe to claim
						</Button>
					}
				</div>
			</AccordionBodyContent>
		</Accordion>
	)
}

export default PepemonOneSubscription;
