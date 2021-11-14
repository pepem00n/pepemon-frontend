import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components";
import Web3 from 'web3';
import { Spacer, Button, Title, IButtonPopover, Text, ContentCentered } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { useTokenPrices, useHorizontalScroll } from '../../../hooks';
import { calculatePpblzApy, calculatePpblzEthLpApy, correctChainIsLoaded } from '../../../utils';
import { pepeball, uniswap, ppdexLogo } from '../../../assets';
import { theme } from '../../../theme';
import { sendTransaction } from '../../../pepemon/utils';

const StakeCard: React.FC<any> = () => {
    //TODO: implement proper state / context management
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

    const [pepemon] = useContext(PepemonProviderContext);
    const { account, contracts, provider } = pepemon;
	const web3 = new Web3(provider);


    const { ppblzPrice, ppdexPrice } = useTokenPrices();
	const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
	const ppblzEthLpApy = calculatePpblzEthLpApy(ppblzPrice, ppdexPrice);

    let timer: any = useRef(null);
    let horzScroll: any = useRef(null);
	useHorizontalScroll(horzScroll);

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
        let _ppblzAllowance = await contracts.ppblz.allowance(account, contracts.ppdex.address);
        setPpblzAllowance(parseFloat(web3.utils.fromWei(_ppblzAllowance.toString())));
        if (_ppblzAllowance > 0 ) {
            setIsApprovedPpblz(true)
        }
    }, [setPpblzAllowance, account, contracts.ppblz, contracts.ppdex.address, web3.utils])

    const getUniV2PpblzAllowance = useCallback( async () => {
        // @ts-ignore
        let _uniV2PpblzAllowance = await contracts.uniV2_ppblz.allowance(account, contracts.ppdex.address);
        setUniV2PpblzAllowance(parseFloat(web3.utils.fromWei(_uniV2PpblzAllowance.toString())));
        if (_uniV2PpblzAllowance > 0 ) {
            setIsApprovedUniV2Ppblz(true)
        }
    }, [contracts.uniV2_ppblz, contracts.ppdex.address, setUniV2PpblzAllowance, setIsApprovedUniV2Ppblz, account, web3.utils])

    const getPpblzBalance = useCallback( async () => {
        let _ppblzBalance = await contracts.ppblz.balanceOf(account);
        setPpblzBalance(parseFloat(web3.utils.fromWei(_ppblzBalance.toString())));
    }, [contracts.ppblz, setPpblzBalance, web3.utils, account])

    const getUniV2PpblzBalance = useCallback( async () => {
        let _uniV2PpblzBalance = await contracts.uniV2_ppblz.balanceOf(account);
        setUniV2PpblzBalance(parseFloat(web3.utils.fromWei(_uniV2PpblzBalance.toString())));
    }, [contracts.uniV2_ppblz, setUniV2PpblzBalance, account, web3.utils])

    const getPpdexBalance = useCallback( async () => {
        let _ppdexBalance = await contracts.ppdex.balanceOf(account);
        setPpdexBalance(parseFloat(web3.utils.fromWei(_ppdexBalance.toString())));
    }, [contracts.ppdex, setPpdexBalance, account, web3.utils])

    const getPpblzSupply = useCallback( async () => {
        let _ppblzSupply = await contracts.ppblz.totalSupply();
        setTotalPpblzSupply(parseFloat(web3.utils.fromWei(_ppblzSupply.toString())));
    }, [contracts.ppblz, setTotalPpblzSupply, web3.utils])

    const getUniV2PpblzSupply = useCallback( async () => {
        let _ppblzSupply = await contracts.uniV2_ppblz.totalSupply();
        setTotalUniV2PpblzSupply(parseFloat(web3.utils.fromWei(_ppblzSupply.toString())));
    }, [contracts.uniV2_ppblz, setTotalUniV2PpblzSupply, web3.utils])

    const getMyPpblzStakeAmount = useCallback( async () => {
        let stakeA = await contracts.ppdex.getAddressPpblzStakeAmount(account);
        setPpblzStakedAmount(parseFloat(web3.utils.fromWei(stakeA.toString())));
    }, [contracts.ppdex, setPpblzStakedAmount, account, web3.utils])

    const getMyUniV2PpblzStakeAmount = useCallback( async () => {
        let stakeA = await contracts.ppdex.getAddressUniV2StakeAmount(account);
        setUniV2PpblzStakedAmount(parseFloat(web3.utils.fromWei(stakeA.toString())));
    }, [contracts.ppdex, setUniV2PpblzStakedAmount, account, web3.utils])

    const getPpdexRewards = useCallback( async () => {
        setIsUpdatingRewards(true);
        let cRewards = (await contracts.ppdex.myRewardsBalance(account)).toString();
        const ppblzStaked = (await contracts.ppdex.getAddressPpblzStakeAmount(account)).toString();
        const uniV2Staked = (await contracts.ppdex.getAddressUniV2StakeAmount(account)).toString();

        // Faulty myRewardsBalance edge case.. dont use view but recalculate!
        if (ppblzStaked > 0 && uniV2Staked > 0) {
            const lastRewardBlock = await contracts.ppdex.getLastBlockCheckedNum(account);
            const currentBlock = await contracts.ppdex.getBlockNum();
            const liquidityMultiplier = await contracts.ppdex.getLiquidityMultiplier();
            const rewardsVar = 100000;

            const ppblzRewardBalance = ppblzStaked * (currentBlock - lastRewardBlock) / rewardsVar;
            const uniV2RewardsBalance = uniV2Staked * ((currentBlock - lastRewardBlock) * liquidityMultiplier) / rewardsVar;
            const originalReward = cRewards - (ppblzRewardBalance + uniV2RewardsBalance);

            if (originalReward > 10000) {
                const realReward = ((cRewards - (ppblzRewardBalance + uniV2RewardsBalance)) / 2) + (ppblzRewardBalance + uniV2RewardsBalance);
                cRewards = realReward.toString();
            }
        }
        setPpdexRewards(parseFloat(web3.utils.fromWei(cRewards)));

        setTimeout(() => {
            setIsUpdatingRewards(false);
            clearTimeout(timer);
        }, 2000);
    }, [account, contracts.ppdex, web3.utils])

    const stakePpblz = async () => {
        if ((isStakingPpblz || parseFloat(ppblzStakeAmount) === 0) || (parseFloat(ppblzStakeAmount) > ppblzBalance)) {
            return;
        }

        setIsStakingPpblz(true);
        try {
            let stakeRes = await sendTransaction(provider, async () => await contracts.ppdex.stakePpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }));
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
            let stakeRes = await sendTransaction(provider, async () => await contracts.ppdex.stakeUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))
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
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawPpblz(web3.utils.toWei(ppblzStakeAmount.toString()), { gasLimit: 200000 }))

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
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawUniV2(web3.utils.toWei(uniV2PpblzStakeAmount.toString()), { gasLimit: 200000 }))

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
            let approveStaking = await sendTransaction(provider, async () => await contracts.ppblz.approve(
                contracts.ppdex.address,
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
            let approveStaking = await sendTransaction(provider, async () => await contracts.uniV2_ppblz.approve(
                contracts.ppdex.address,
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
                await sendTransaction(provider, async () => await contracts.ppdex.getReward());

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
        if (!pepemon || !contracts) {
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
    }, [account, pepemon, contracts, provider, transactionFinished,
		getMyPpblzStakeAmount, getMyUniV2PpblzStakeAmount, getPpblzAllowance, getPpblzBalance, getPpblzSupply, getPpdexBalance, getPpdexRewards, getUniV2PpblzAllowance, getUniV2PpblzBalance, getUniV2PpblzSupply
	]);

    //TODO: simplify validation
    return (
		<StakeGrid>
			<StakeGridTop ref={horzScroll}>
				<StakeGridArea>
					<StakeGridAreaHeader>
						<StakeGridAreaHeaderTitle>
							<img loading="lazy" src={pepeball} alt="Pepeball"/>
							<Spacer size="sm"/>
							<Title as="h2" size='m' color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ</Title>
						</StakeGridAreaHeaderTitle>
						<StakeGridAreaHeaderMeta>
							<span>{ppblzApy.toFixed(0)}% APY</span>
							<IButtonPopover cursor={'help'} heading="APY staking PPBLZ"
								apy={ppblzApy}
								ppdexPrice={ppdexPrice}
								button={{ href:"https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8", text: 'Buy PPBLZ' }}/>
						</StakeGridAreaHeaderMeta>
					</StakeGridAreaHeader>
					<StakeGridAreaBody>
						<DataColumns>
							<DataColumn>
								<Text as="p" size="m" font={theme.font.inter}>PPBLZ balance</Text>
								<Spacer size="sm"/>
								<Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(ppblzBalance.toString()).toFixed(2)}</Text>
							</DataColumn>
							<DataColumn>
								<Text as="p" size="m" font={theme.font.inter}>PPBLZ staked</Text>
								<Spacer size="sm"/>
								<Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(ppblzStakedAmount.toString()).toFixed(2)}</Text>
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
				<StakeGridArea>
					<StakeGridAreaHeader>
						<StakeGridAreaHeaderTitle>
							<img loading="lazy" src={uniswap} alt="Uniswap"/>
							<Spacer size="sm"/>
							<Title as="h2" size='m' color={theme.color.white} font={theme.font.neometric} weight={900}>Stake PPBLZ-ETH LP</Title>
						</StakeGridAreaHeaderTitle>
						<StakeGridAreaHeaderMeta>
							<span>{ppblzEthLpApy.toFixed(0)}% APY</span>
							<IButtonPopover cursor={'help'} heading="APY staking PPBLZ-ETH"
								apy={ppblzEthLpApy}
								ppdexPrice={ppdexPrice}
								button={{ href: "https://app.uniswap.org/#/add/0x4D2eE5DAe46C86DA2FF521F7657dad98834f97b8/ETH", text: 'Provide PPBLZ-ETH LP liquidity' }}/>
						</StakeGridAreaHeaderMeta>
					</StakeGridAreaHeader>
					<StakeGridAreaBody>
						<DataColumns>
							<DataColumn>
								<Text as="p" size="m" font={theme.font.inter}>PPBLZ-ETH balance</Text>
								<Spacer size="sm"/>
								<Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}</Text>
							</DataColumn>
							<DataColumn>
								<Text as="p" size="m" font={theme.font.inter}>PPBLZ-ETH staked</Text>
								<Spacer size="sm"/>
								<Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(2)}</Text>
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
			</StakeGridTop>
			<StakeGridArea>
				<StakeGridAreaHeader wide>
					<StakeGridAreaHeaderTitle>
						<img loading="lazy" src={ppdexLogo} alt="PPDEX"/>
						<Spacer size="sm"/>
						<Title as="h2" size='m' color={theme.color.white} font={theme.font.neometric} weight={900}>PPDEX Earned</Title>
					</StakeGridAreaHeaderTitle>
				</StakeGridAreaHeader>
				<StakeGridAreaBody>
					<ClaimGrid>
						<Text style={{ gridArea: 'area0' }} as="p" font={theme.font.neometric} weight={900} size='xl'>
							{parseFloat(ppdexBalance.toString()).toFixed(2)} $PPDEX
						</Text>

						<Text style={{ gridArea: 'area1' }} as="p" font={theme.font.inter}>
							Total value: $ {((parseFloat(ppdexBalance.toString()) * ppdexPrice) + (ppdexRewards * ppdexPrice)).toFixed(2)}
						</Text>

						<UpdateButton style={{ gridArea: 'area2' }} styling="link" onClick={() => !isUpdatingRewards && getPpdexRewards()} {...(isUpdatingRewards && {disabled: true})}>
							{isUpdatingRewards ? "UPDATING..." : "UPDATE"}
						</UpdateButton>

						<Button style={{ gridArea: 'area3' }} styling="purple" disabled={(isStakingPpblz || isWithdrawingPpblz) || isUpdatingRewards || (!(ppblzStakedAmount > 0) && (!(ppdexRewards > 0.1) || isClaiming))} onClick={claimRewards} width="clamp(100px, 18em, 100%)">{(isStakingPpblz || isWithdrawingPpblz || isUpdatingRewards) ? "Updating..." : isClaiming ? "Claiming..." : `${ppdexRewards.toFixed(2)} PPDEX to claim`}</Button>
					</ClaimGrid>
				</StakeGridAreaBody>
			</StakeGridArea>
		</StakeGrid>
    );
}

const StakeGrid = styled.section``

const StakeGridArea = styled.div<{area?: string}>`
	background-color: ${theme.color.purple[800]};
	border-radius: ${theme.borderRadius}px;
	display: flex;
	flex-direction: column;
	grid-area: ${props => props.area};
	margin-bottom: 1em;
	min-width: 0px;
	overflow: hidden;
`

const StakeGridTop = styled.div`
	display: flex;
	justify-content: space-between;
	overflow: auto;

	@media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tabletL}) {
		flex-wrap: wrap;
	}

	${StakeGridArea} {
		min-width: min(400px, 90%);
		width: 100%;

		&:not(:first-child) {
			margin-left: 1.25em;

			@media (min-width: ${theme.breakpoints.mobile}) and (max-width: ${theme.breakpoints.tabletL}) {
				margin-left: 0;
			}
		}
	}
`

const StakeGridAreaHeader = styled.div<{wide?: boolean}>`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: clamp(1.125em, 3.75vw, 1.2em) clamp(.8em, 2.65vw, 2em);

	${({wide}) => wide && `
		@media (min-width: ${theme.breakpoints.tabletL}) {
			justify-content: center;
		}
	`}
`

const StakeGridAreaHeaderTitle = styled.div`
	align-items: center;
	display: flex;

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
	padding: clamp(1.125em,3.75vw,1.2em) clamp(.8em,2.65vw,2em) clamp(.8em,2.65vw,2em);
	flex: 1 0 auto;
`

const ClaimGrid = styled.div`
	display: grid;
	grid-template-areas: "area0 area2" "area1 area1" "area3 area3";
	grid-column-gap: 1.25em;
	grid-row-gap: 1.25em;

	@media (min-width: ${theme.breakpoints.tabletL}) {
		grid-template-areas: "area0 area0" "area1 area2" "area3 area3";
		justify-content: center;
	}
`

const UpdateButton = styled(Button)`
	text-align: right;
	padding: 0;

	@media (min-width: ${theme.breakpoints.tabletL}) {
		text-align: left;
	}
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
	flex: 1 1 auto;
	min-width: 0;

	&:focus-within {
		outline : none;
	}
`


export default StakeCard
