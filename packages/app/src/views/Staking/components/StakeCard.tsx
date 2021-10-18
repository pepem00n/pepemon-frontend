import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Spacer, Button, Title, IButtonPopover, ExternalLink, Text, ContentCentered } from '../../../components';
import { useTokenPrices, usePepemon } from '../../../hooks';
import { correctChainIsLoaded } from '../../../utils';
import { pokeball, uniswap } from '../../../assets';
import { theme } from '../../../theme';
import {sendTransaction} from '../../../pepemon/utils';

interface StakeCardProps {
    pepemon: any,
    web3: any,
}

const StakeCard: React.FC<StakeCardProps> = ({ pepemon, web3 }) => {
    //TODO: implement proper state / context management
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [popoverOpen2, setPopoverOpen2] = useState(false);
	const toggle = () => setPopoverOpen(!popoverOpen);
	const toggle2 = () => setPopoverOpen2(!popoverOpen2);
    const [ppblzStakeAmount, setPpblzStakeAmount] = useState(null)
    const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0)
    const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState(null)
    const [uniV2PpblzStakedAmount, setUniV2PpblzStakedAmount] = useState(0)
    const [isApprovedPpblz, setIsApprovedPpblz] = useState(false)
    const [isApprovingPpblz, setIsApprovingPpblz] = useState(false)
    const [isApprovedUniV2Ppblz, setIsApprovedUniV2Ppblz] = useState(false)
    const [isApprovingUniV2Ppblz, setIsApprovingUniV2Ppblz] = useState(false)
    const [isStakingPpblz, setIsStakingPpblz] = useState(false)
    const [isWithdrawingPpblz, setIsWithdrawingPpblz] = useState(false)
    const [isStakingUniV2Ppblz, setIsStakingUniV2Ppblz] = useState(false)
    const [isWithdrawingUniV2Ppblz, setIsWithdrawingUniV2Ppblz] = useState(false)
    const [isClaiming, setIsClaiming] = useState(false)
    const [isUpdatingRewards, setIsUpdatingRewards] = useState(false)
    const [ppdexRewards, setPpdexRewards] = useState(0)
    const [totalPpblzSupply, setTotalPpblzSupply] = useState(0)
    const [totalUniV2PpblzSupply, setTotalUniV2PpblzSupply] = useState(0)
    const [ppblzAllowance, setPpblzAllowance] = useState(0)
    const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState(0)
    const [ppblzBalance, setPpblzBalance] = useState(0)
    const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState(0)
    const [ppdexBalance, setPpdexBalance] = useState(0)
    const [transactionFinished, setTransactionFinished] = useState(0);
	const [ppblzStakeAdd, setPpblzStakeAdd]= useState(false);
	const [ppblzStakeSub, setPpblzStakeSub]= useState(false);
	const [uniV2PpblzStakeAdd, setUniV2PpblzStakeAdd]= useState(false);
	const [uniV2PpblzStakeSub, setUniV2PpblzStakeSub]= useState(false);

    const { provider, account } = usePepemon()
    const getAccount = useCallback(() => {
        return account
    }, [account])

    const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const calculateApy = () => {
        const rewardedPerYear = ppdexPrice * 20;
        return (rewardedPerYear * 100) / ppblzPrice;
    }

    let timer: any = useRef(null);

    useEffect(() => {
        return () => timer && clearTimeout(timer);
    }, [timer])

    const resetToInitialStateOnReject = async () => {
        setIsStakingPpblz(false);
        setIsApprovingPpblz(false);
        setIsWithdrawingPpblz(false);
        setIsStakingUniV2Ppblz(false);
        setIsApprovingUniV2Ppblz(false);
        setIsWithdrawingUniV2Ppblz(false);
        setIsClaiming(false);
    }

    //TODO: move to generic contract service
    /** getters */
    const getPpblzAllowance = useCallback(async () => {
        // @ts-ignore
        let _ppblzAllowance = await pepemon.contracts.ppblz.allowance(getAccount(), pepemon.contracts.ppdex.address);
        setPpblzAllowance(web3.utils.fromWei(_ppblzAllowance.toString()));
        if (_ppblzAllowance > 0 ) {
            setIsApprovedPpblz(true)
        }
    }, [setPpblzAllowance, getAccount, pepemon.contracts.ppblz, pepemon.contracts.ppdex.address, web3.utils])

    const getUniV2PpblzAllowance = useCallback( async () => {
        // @ts-ignore
        let _uniV2PpblzAllowance = await pepemon.contracts.uniV2_ppblz.allowance(getAccount(), pepemon.contracts.ppdex.address);
        setUniV2PpblzAllowance(web3.utils.fromWei(_uniV2PpblzAllowance.toString()));
        if (_uniV2PpblzAllowance > 0 ) {
            setIsApprovedUniV2Ppblz(true)
        }
    }, [pepemon.contracts.uniV2_ppblz, pepemon.contracts.ppdex.address, setUniV2PpblzAllowance, setIsApprovedUniV2Ppblz, getAccount, web3.utils])

    const getPpblzBalance = useCallback( async () => {
        let _ppblzBalance = await pepemon.contracts.ppblz.balanceOf(getAccount());
        setPpblzBalance(web3.utils.fromWei(_ppblzBalance.toString()));
    }, [pepemon.contracts.ppblz, setPpblzBalance, web3.utils, getAccount])

    const getUniV2PpblzBalance = useCallback( async () => {
        let _uniV2PpblzBalance = await pepemon.contracts.uniV2_ppblz.balanceOf(getAccount());
        setUniV2PpblzBalance(web3.utils.fromWei(_uniV2PpblzBalance.toString()));
    }, [pepemon.contracts.uniV2_ppblz, setUniV2PpblzBalance, getAccount, web3.utils])

    const getPpdexBalance = useCallback( async () => {
        let _ppdexBalance = await pepemon.contracts.ppdex.balanceOf(getAccount());
        setPpdexBalance(web3.utils.fromWei(_ppdexBalance.toString()));
    }, [pepemon.contracts.ppdex, setPpdexBalance, getAccount, web3.utils])

    const getPpblzSupply = useCallback( async () => {
        let _ppblzSupply = await pepemon.contracts.ppblz.totalSupply();
        setTotalPpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
    }, [pepemon.contracts.ppblz, setTotalPpblzSupply, web3.utils])

    const getUniV2PpblzSupply = useCallback( async () => {
        let _ppblzSupply = await pepemon.contracts.uniV2_ppblz.totalSupply();
        setTotalUniV2PpblzSupply(web3.utils.fromWei(_ppblzSupply.toString()));
    }, [pepemon.contracts.uniV2_ppblz, setTotalUniV2PpblzSupply, web3.utils])

    const getMyPpblzStakeAmount = useCallback( async () => {
        let stakeA = await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount());
        setPpblzStakedAmount((web3.utils.fromWei(stakeA.toString())));
    }, [pepemon.contracts.ppdex, setPpblzStakedAmount, getAccount, web3.utils])

    const getMyUniV2PpblzStakeAmount = useCallback( async () => {
        let stakeA = await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount());
        setUniV2PpblzStakedAmount((web3.utils.fromWei(stakeA.toString())));
    }, [pepemon.contracts.ppdex, setUniV2PpblzStakedAmount, getAccount, web3.utils])

    const getPpdexRewards = useCallback( async () => {
        setIsUpdatingRewards(true);
        let cRewards = (await pepemon.contracts.ppdex.myRewardsBalance(getAccount())).toString();
        const ppblzStaked = (await pepemon.contracts.ppdex.getAddressPpblzStakeAmount(getAccount())).toString();
        const uniV2Staked = (await pepemon.contracts.ppdex.getAddressUniV2StakeAmount(getAccount())).toString();

        // Faulty myRewardsBalance edge case.. dont use view but recalculate!
        if (ppblzStaked > 0 && uniV2Staked > 0) {
            const lastRewardBlock = await pepemon.contracts.ppdex.getLastBlockCheckedNum(getAccount());
            const currentBlock = await pepemon.contracts.ppdex.getBlockNum();
            const liquidityMultiplier = await pepemon.contracts.ppdex.getLiquidityMultiplier();
            const rewardsVar = 100000;

            const ppblzRewardBalance = ppblzStaked * (currentBlock - lastRewardBlock) / rewardsVar;
            const uniV2RewardsBalance = uniV2Staked * ((currentBlock - lastRewardBlock) * liquidityMultiplier) / rewardsVar;
            const originalReward = cRewards - (ppblzRewardBalance + uniV2RewardsBalance);

            if (originalReward > 10000) {
                const realReward = ((cRewards - (ppblzRewardBalance + uniV2RewardsBalance)) / 2) + (ppblzRewardBalance + uniV2RewardsBalance);
                cRewards = realReward.toString();
            }
        }
        setPpdexRewards(web3.utils.fromWei(cRewards));

        setTimeout(() => {
            setIsUpdatingRewards(false);
            clearTimeout(timer);
        }, 2000);
    }, [getAccount, pepemon.contracts.ppdex, web3.utils])

    const stakePpblz = async () => {
        if ((isStakingPpblz || parseFloat(ppblzStakeAmount) === 0) || (parseFloat(ppblzStakeAmount) > ppblzBalance)) {
            return;
        }

        setIsStakingPpblz(true);
        try {
            let stakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.stakePpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }));
            if (stakeRes) {
                setIsStakingPpblz(false);
                setPpblzStakeAmount(null);
                await getMyPpblzStakeAmount();
                await getPpblzBalance();
                await getPpblzAllowance();
                await getPpdexRewards();

            }
            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const stakeUniV2Ppblz = async () => {
        if ((isStakingUniV2Ppblz || parseFloat(uniV2PpblzStakeAmount) === 0) || (parseFloat(uniV2PpblzStakeAmount) > uniV2PpblzBalance)) {
            return;
        }

        setIsStakingUniV2Ppblz(true);
        try {
            let stakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.stakeUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))
            if (stakeRes) {
                setIsStakingUniV2Ppblz(false);
                setUniV2PpblzStakeAmount(null);
                await getMyUniV2PpblzStakeAmount();
                await getUniV2PpblzBalance();
                await getUniV2PpblzAllowance();
                await getPpdexRewards();

            }
            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const withdrawPpblz = async () => {
        if (isWithdrawingPpblz || ppblzStakeAmount === 0) {
            return;
        }
        setIsWithdrawingPpblz(true);
        try {
            let unstakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.withdrawPpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }))

            if (unstakeRes) {
                setIsWithdrawingPpblz(false);
                setPpblzStakeAmount(null);
                await getMyPpblzStakeAmount();
                await getPpblzBalance();
                await getPpblzAllowance();
                await getPpdexRewards();
            } else {
                setIsWithdrawingPpblz(false);
            }

            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const withdrawUniV2Ppblz = async () => {
        if (isWithdrawingUniV2Ppblz || uniV2PpblzStakeAmount === 0) {
            return;
        }
        setIsWithdrawingUniV2Ppblz(true);
        try {
            let unstakeRes = await sendTransaction(provider, async () => await pepemon.contracts.ppdex.withdrawUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))

            if (unstakeRes) {
                setIsWithdrawingUniV2Ppblz(false);
                setUniV2PpblzStakeAmount(null);
                await getMyUniV2PpblzStakeAmount();
                await getUniV2PpblzBalance();
                await getUniV2PpblzAllowance();
                await getPpdexRewards();
            } else {
                setIsWithdrawingUniV2Ppblz(false);
            }

            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const approvePpblz = async () => {
        if (isApprovingPpblz) {
            return;
        }
        setIsApprovingPpblz(true);

        try {
            let approveStaking = await sendTransaction(provider, async () => await pepemon.contracts.ppblz.approve(
                pepemon.contracts.ppdex.address,
                web3.utils.toWei(totalPpblzSupply.toString())
            ))

            await getPpblzAllowance();

            if (approveStaking) {
                setIsApprovingPpblz(false);
                setIsApprovedPpblz(true);
            }

            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const approveUniV2Ppblz = async () => {
        if (isApprovingUniV2Ppblz) {
            return;
        }
        setIsApprovingUniV2Ppblz(true);

        try {
            let approveStaking = await sendTransaction(provider, async () => await pepemon.contracts.uniV2_ppblz.approve(
                pepemon.contracts.ppdex.address,
                web3.utils.toWei(totalUniV2PpblzSupply.toString())
            ));
            await getUniV2PpblzAllowance();

            if (approveStaking) {
                setIsApprovingUniV2Ppblz(false);
                setIsApprovedUniV2Ppblz(true);
            }

            return setTransactionFinished(transactionFinished + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    }

    const cleanNumberInput = (value: string, maxDecimals: number) => {
        if (value[0] === '0' && (value[1] && value[1] !== '.')) {
            return value[1]
        }
        if (value.slice(-2) === '..') {
            return value.slice(0, -1);
        }
        if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
            return `${value.split('.')[0]}.${value.split('.')[1].slice(0, maxDecimals)}`
        }
        return value;
    }

    const isInvalidInput = (value: string) =>
        !Number(value) &&
        value !== '' &&
        parseFloat(value) !== 0 &&
        value.slice(-1) !== '.' &&
        (value.slice(-2) !== '.0')
    ;

    /** setters & modifiers */
    const updatePpblzStakingInput = (e: any) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setPpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    }

    const updateUniV2PpblzStakingInput = (e: any) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setUniV2PpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    }

    const setPpblzInputField = () => {
        if (ppblzStakeAmount !== null) {
            return ppblzStakeAmount;
        } else {
            return '';
        }
    }

    const setUniV2PpblzInputField = () => {
        if (uniV2PpblzStakeAmount !== null) {
            return uniV2PpblzStakeAmount;
        } else {
            return '';
        }
    }

    const setMaxPpblz = () => {
        if (parseFloat(ppblzBalance.toString()) === 0) {
            return setPpblzStakeAmount(ppblzStakedAmount);
        }
        if (parseFloat(ppblzStakedAmount.toString()) === 0) {
            return setPpblzStakeAmount(ppblzBalance);
        }
        if (ppblzBalance === ppblzStakeAmount) {
            return setPpblzStakeAmount(ppblzStakedAmount);
        }
        return setPpblzStakeAmount(ppblzBalance);
    }

    const setMaxUniV2Ppblz = () => {
        if (parseFloat(uniV2PpblzBalance.toString()) === 0) {
            return setUniV2PpblzStakeAmount(uniV2PpblzStakedAmount);
        }
        if (parseFloat(uniV2PpblzStakedAmount.toString()) === 0) {
            return setUniV2PpblzStakeAmount(uniV2PpblzBalance);
        }
        if (uniV2PpblzBalance === uniV2PpblzStakeAmount) {
            return setUniV2PpblzStakeAmount(uniV2PpblzStakedAmount);
        }
        return setUniV2PpblzStakeAmount(uniV2PpblzBalance);
    }

    const claimRewards = async () => {
        if(isClaiming) {
            return;
        }

        if(ppdexRewards > 0) {
            setIsClaiming(true);
            try {
                await sendTransaction(provider, async () => await pepemon.contracts.ppdex.getReward());

                await getPpdexRewards();
                setTransactionFinished(transactionFinished + 1);
            } catch (error) {
                console.log(error);
                await resetToInitialStateOnReject();
            }
        }
        setIsClaiming(false);
    }

    // const shouldClaimFirst = (asset: string) => {
    //     if (asset === 'UNIV2') {
    //         return (parseFloat(uniV2PpblzStakedAmount.toString()) === 0 && parseFloat(ppblzStakedAmount.toString()) > 0) &&
    //             parseFloat(ppdexRewards.toString()) > 0.1
    //     }
    //     if (asset === 'PPBLZ') {
    //         return (parseFloat(ppblzStakedAmount.toString()) === 0 && parseFloat(uniV2PpblzBalance.toString()) > 0) &&
    //             parseFloat(ppdexRewards.toString()) > 0.1;
    //     }
    //     return false;
    // }

    useEffect(() => {
        if (!pepemon || !pepemon.contracts) {
            return;
        }
        correctChainIsLoaded(pepemon).then(correct => {
            if (!correct) {
                return;
            }

            try {
                getPpblzAllowance();
                getPpblzSupply();
                getPpblzBalance();
                getMyPpblzStakeAmount();
                getUniV2PpblzAllowance();
                getUniV2PpblzSupply();
                getUniV2PpblzBalance();
                getMyUniV2PpblzStakeAmount();
                getPpdexBalance();
                getPpdexRewards();
                getUniV2PpblzBalance();
                getUniV2PpblzSupply();
                setIsApprovedPpblz(false);
                setIsApprovedUniV2Ppblz(false);
            } catch (error) {
                // Catch any errors for any of the above operations.
                alert(
                    `Failed to load web3, accounts, or contract. Check console for details.`,
                );
                console.error(error);
            }
        })
    }, [account, pepemon, provider, transactionFinished,
		getMyPpblzStakeAmount, getMyUniV2PpblzStakeAmount, getPpblzAllowance, getPpblzBalance, getPpblzSupply, getPpdexBalance, getPpdexRewards, getUniV2PpblzAllowance, getUniV2PpblzBalance, getUniV2PpblzSupply
	]);

    //TODO: simplify validation
    return (
		<StakeGrid>
			<StakeGridArea area="ppblz">
				<StakeGridAreaHeader>
					<StakeGridAreaHeaderTitle>
						<img loading="lazy" src={pokeball} alt="Pokeball"/>
						<Spacer size="sm"/>
						<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ</Title>
					</StakeGridAreaHeaderTitle>
					<StakeGridAreaHeaderMeta>
						<span>{calculateApy().toFixed(0)}% APY</span>
						<IButtonPopover toggle={toggle} isOpen={popoverOpen} heading="APY staking PPBLZ" button={
							<ExternalLink size={.75} href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8">Buy PPBLZ</ExternalLink>
						}/>
					</StakeGridAreaHeaderMeta>
				</StakeGridAreaHeader>
				<StakeGridAreaBody>
					<DataColumns>
						<DataColumn>
							<Text as="p" font={theme.font.inter}>PPBLZ balance</Text>
							<Spacer size="sm"/>
							<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(ppblzBalance.toString()).toFixed(2)}</Text>
						</DataColumn>
						<DataColumn>
							<Text as="p" font={theme.font.inter}>PPBLZ staked</Text>
							<Spacer size="sm"/>
							<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(ppblzStakedAmount.toString()).toFixed(2)}</Text>
						</DataColumn>
					</DataColumns>
					<div style={{ marginTop: "auto" }}>
						{isApprovedPpblz && !ppblzStakeAdd && !ppblzStakeSub &&
							<ContentCentered
								style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								}}
							>
								<Button styling="white" onClick={() => {
									setPpblzStakeSub(true);
									setPpblzStakeAdd(false);
								}} width="20%" symbol aria-label="withdraw"
									{...(ppblzStakedAmount <= 0 && {disabled: true})}
								>-</Button>
								<Spacer size="sm"/>
								<Button styling="purple" onClick={() => {
									setPpblzStakeSub(false);
									setPpblzStakeAdd(true);
								}} width="80%" symbol aria-label="stake"
								{...(ppblzBalance <= 0 && {disabled: true})}
								>+</Button>
							</ContentCentered>
						}
						{(!isApprovedPpblz || ppblzAllowance < parseFloat(ppblzStakeAmount)) &&
							<Button styling="purple" onClick={approvePpblz} {...((isUpdatingRewards || isApprovingPpblz) && {disabled: true})} width="100%">{isUpdatingRewards ? "Updating..." : !isApprovingPpblz ? "Enable" : "Enabling..."}</Button>
						}
						{isApprovedPpblz &&
						!isWithdrawingPpblz &&
						!isStakingPpblz &&
						(ppblzStakeAdd || ppblzStakeSub) &&
							<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
								<StyledInput
									placeholder="0.00"
									value={setPpblzInputField() || ""}
									onChange={(event) => updatePpblzStakingInput(event) }
									min="0.00"
									step="1"
									autoFocus={true} />
								<Button styling="link" onClick={setMaxPpblz}>Max</Button>
								<Button styling="purple"
									{...(ppblzStakeAdd && !ppblzStakeSub ?
										{
											onClick: stakePpblz,
											disabled: !(parseFloat(ppblzStakeAmount) > 0 && parseFloat(ppblzStakeAmount) <= ppblzBalance) || isStakingPpblz
										} : ppblzStakeSub && !ppblzStakeAdd &&
										{ onClick: withdrawPpblz,
											disabled: !(parseFloat(ppblzStakeAmount) > 0 && parseFloat(ppblzStakeAmount) <= ppblzStakedAmount) || isWithdrawingPpblz }
									)}
								>
									{ppblzStakeAdd && !ppblzStakeSub ? "Stake" : !ppblzStakeAdd && ppblzStakeSub && "Withdraw"}
								</Button>
							</ContentCentered>
						}
						{ (isStakingPpblz || isWithdrawingPpblz) &&
							<Button styling="purple" onClick={approvePpblz} width="100%" disabled>
								{isStakingPpblz && "Staking"}
								{isWithdrawingPpblz &&  "Withdrawing"}
							...</Button>
						}
					</div>
				</StakeGridAreaBody>
			</StakeGridArea>
			<StakeGridArea area="pplbzEthLp">
				<StakeGridAreaHeader>
					<StakeGridAreaHeaderTitle>
						<img loading="lazy" src={uniswap} alt="Uniswap"/>
						<Spacer size="sm"/>
						<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ-ETH LP</Title>
					</StakeGridAreaHeaderTitle>
					<StakeGridAreaHeaderMeta>
						<span>87% APY</span>
						<IButtonPopover toggle={toggle2} isOpen={popoverOpen2} heading="APY staking PPBLZ-ETH" button={
							<ExternalLink size={.75} href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8">Buy PPBLZ-ETH</ExternalLink>
						}/>
					</StakeGridAreaHeaderMeta>
				</StakeGridAreaHeader>
				<StakeGridAreaBody>
					<DataColumns>
						<DataColumn>
							<Text as="p" font={theme.font.inter}>PPBLZ-ETH balance</Text>
							<Spacer size="sm"/>
							<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}</Text>
						</DataColumn>
						<DataColumn>
							<Text as="p" font={theme.font.inter}>PPBLZ-ETH staked</Text>
							<Spacer size="sm"/>
							<Text as="p" font={theme.font.neometric} weight={900} size={2}>{parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(2)}</Text>
						</DataColumn>
					</DataColumns>
					<div style={{ marginTop: "auto" }}>
						{isApprovedUniV2Ppblz && !uniV2PpblzStakeAdd && !uniV2PpblzStakeSub &&
							<ContentCentered
								style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								}}
							>
								<Button styling="white" onClick={() => {
									setUniV2PpblzStakeSub(true);
									setUniV2PpblzStakeAdd(false);
								}} width="20%" symbol aria-label="withdraw"
								{...(uniV2PpblzStakedAmount <= 0 && {disabled: true})}
								>-</Button>
								<Spacer size="sm"/>
								<Button styling="purple" onClick={() => {
									setUniV2PpblzStakeSub(false);
									setUniV2PpblzStakeAdd(true);
								}} width="80%" symbol aria-label="stake"
								{...(uniV2PpblzBalance <= 0 && {disabled: true})}
								>+</Button>
							</ContentCentered>
						}
						{(!isApprovedUniV2Ppblz || uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount)) &&
							<Button styling="purple" onClick={approveUniV2Ppblz} {...((isUpdatingRewards || isApprovingUniV2Ppblz) && {disabled: true})} width="100%">{isUpdatingRewards ? "Updating..." :!isApprovingUniV2Ppblz ? "Enable" : "Enabling..."}</Button>
						}
						{isApprovedUniV2Ppblz &&
						!isWithdrawingUniV2Ppblz &&
						!isStakingUniV2Ppblz &&
						(uniV2PpblzStakeAdd || uniV2PpblzStakeSub) &&
							<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
								<StyledInput
									placeholder="0.00"
									value={setUniV2PpblzInputField() || ""}
									onChange={(event) => updateUniV2PpblzStakingInput(event) }
									min="0.00"
									step="1"
									autoFocus={true} />
								<Button styling="link" onClick={setMaxUniV2Ppblz}>Max</Button>
								<Button styling="purple"
									{...(uniV2PpblzStakeAdd && !uniV2PpblzStakeSub ?
										{
											onClick: stakeUniV2Ppblz,
											disabled: !(parseFloat(uniV2PpblzStakeAmount) > 0 && parseFloat(uniV2PpblzStakeAmount) <= uniV2PpblzBalance) || isStakingUniV2Ppblz
										} : !uniV2PpblzStakeAdd && uniV2PpblzStakeSub &&
										{ onClick: withdrawUniV2Ppblz,
											disabled: !(parseFloat(uniV2PpblzStakeAmount) > 0 && parseFloat(uniV2PpblzStakeAmount) <= ppblzStakedAmount) || isWithdrawingUniV2Ppblz }
									)}
								>
									{uniV2PpblzStakeAdd && !uniV2PpblzStakeSub ? "Stake" : !uniV2PpblzStakeAdd && uniV2PpblzStakeSub && "Withdraw"}
								</Button>
							</ContentCentered>
						}
						{ (isStakingUniV2Ppblz || isWithdrawingUniV2Ppblz) &&
							<Button styling="purple" onClick={approveUniV2Ppblz} width="100%" disabled>
								{isStakingUniV2Ppblz && "Staking"}
								{isWithdrawingUniV2Ppblz &&  "Withdrawing"}
							...</Button>
						}
					</div>
				</StakeGridAreaBody>
			</StakeGridArea>
			<StakeGridArea area="ppdexEarned">
				<StakeGridAreaHeader>
					<StakeGridAreaHeaderTitle>
						<img loading="lazy" src={pokeball} alt="Pokeball"/>
						<Spacer size="sm"/>
						<Title as="h2" size={1.125} color={theme.color.white} font={theme.font.neometric} weight={900}>PPDEX Earned</Title>
					</StakeGridAreaHeaderTitle>
				</StakeGridAreaHeader>
				<StakeGridAreaBody>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Text as="p" font={theme.font.neometric} weight={900} size={2}>
							{parseFloat(ppdexBalance.toString()).toFixed(2)} PPDEX
						</Text>

						<div style={{ display: "flex" }}>
							<Text as="p" font={theme.font.inter}>
								Total value: $ {(parseFloat(ppdexBalance.toString())+ (ppdexRewards * ppdexPrice)).toFixed(2)}
							</Text>
							<Spacer size="md"/>
							<Button styling="link" style={{padding: 0}} onClick={() => !isUpdatingRewards && getPpdexRewards()} {...(isUpdatingRewards && {disabled: true})}>
								{isUpdatingRewards ? "UPDATING..." : "UPDATE"}
							</Button>
						</div>
						<Spacer size="md"/>
						<Button styling="purple" disabled={isUpdatingRewards || ((ppblzStakedAmount > 0) && (!(ppdexRewards > 0.1) || isClaiming))} onClick={claimRewards} width="clamp(100px, 18em, 100%)">{isUpdatingRewards ? "Updating..." : isClaiming ? "Claim..." : "Claim"}</Button>
					</div>
				</StakeGridAreaBody>
			</StakeGridArea>
		</StakeGrid>
    );
}

const StakeGrid = styled.section`
	display: grid;
	grid-column-gap: 1.25em;
	grid-row-gap: 1em;
	grid-template-areas: "ppblz pplbzEthLp" "ppdexEarned ppdexEarned";
	grid-auto-columns: 1fr;
`

const StakeGridArea = styled.div<{area: string}>`
	background-color: ${props => props.theme.color.purple[800]};
	border-radius: ${props => props.theme.borderRadius}px;
	display: flex;
	flex-direction: column;
	grid-area: ${props => props.area};
	min-width: 0px;
	overflow: hidden;
`

const StakeGridAreaHeader = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 1.25em 2em;
`

const StakeGridAreaHeaderTitle = styled.div`
	&{
		display: flex;
		align-items: center;
	}

	img { width: 2.5em; }
`

const StakeGridAreaHeaderMeta = styled.div`
	&{
		display: flex;
		align-items: center;
	}

	span {
		margin-right: .67em;
		color: ${props => props.theme.color.white};
		font-family: ${props => props.theme.font.neometric};
		font-size: .75rem;
		font-weight: 900;
	}
`

const StakeGridAreaBody = styled.div`
	background-color: ${props => props.theme.color.white};
	display: flex;
	flex-direction: column;
	padding: 1.5em 2em 2em;
	flex: 1 0 auto;
`

const DataColumns = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-bottom: 1.5em;
`

const DataColumn = styled.div`
	flex: 1 0 auto;
`

const StyledInput = styled.input`
	border: none;
	font-size: 1rem;
	flex: 1 0 auto;

	&:focus-within {
		outline : none;
	}
`


export default StakeCard
