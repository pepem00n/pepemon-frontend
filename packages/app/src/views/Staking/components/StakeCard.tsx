// StakeCard.tsx

import React, { useCallback, useEffect, useState, useRef, useContext } from 'react';
import styled from "styled-components";
import { ethers } from 'ethers';
import { Spacer, Button, Title, IButtonPopover, Text, ContentCentered } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { useTokenPrices, useHorizontalScroll, useWeb3Modal } from '../../../hooks';
import { calculatePpblzApy, calculatePpblzEthLpApy, correctChainIsLoaded } from '../../../utils';
import { pepeball, uniswap, ppdexLogo } from '../../../assets';
import { theme } from '../../../theme';
import { sendTransaction } from '../../../pepemon/utils';

const StakeCard: React.FC<any> = () => {
    const [ppblzStakeAmount, setPpblzStakeAmount] = useState<string | null>(null);
    const [ppblzStakedAmount, setPpblzStakedAmount] = useState<number>(0);
    const [uniV2PpblzStakeAmount, setUniV2PpblzStakeAmount] = useState<string | null>(null);
    const [uniV2PpblzStakedAmount, setUniV2PpblzStakedAmount] = useState<number>(0);
    const [isApprovedPpblz, setIsApprovedPpblz] = useState<boolean>(false);
    const [isApprovingPpblz, setIsApprovingPpblz] = useState<boolean>(false);
    const [isApprovedUniV2Ppblz, setIsApprovedUniV2Ppblz] = useState<boolean>(false);
    const [isApprovingUniV2Ppblz, setIsApprovingUniV2Ppblz] = useState<boolean>(false);
    const [isStakingPpblz, setIsStakingPpblz] = useState<boolean>(false);
    const [isWithdrawingPpblz, setIsWithdrawingPpblz] = useState<boolean>(false);
    const [isStakingUniV2Ppblz, setIsStakingUniV2Ppblz] = useState<boolean>(false);
    const [isWithdrawingUniV2Ppblz, setIsWithdrawingUniV2Ppblz] = useState<boolean>(false);
    const [isClaiming, setIsClaiming] = useState<boolean>(false);
    const [isUpdatingRewards, setIsUpdatingRewards] = useState<boolean>(false);
    const [ppdexRewards, setPpdexRewards] = useState<number>(0);
    const [totalPpblzSupply, setTotalPpblzSupply] = useState<number>(0);
    const [totalUniV2PpblzSupply, setTotalUniV2PpblzSupply] = useState<number>(0);
    const [ppblzAllowance, setPpblzAllowance] = useState<number>(0);
    const [uniV2PpblAllowance, setUniV2PpblzAllowance] = useState<number>(0);
    const [ppblzBalance, setPpblzBalance] = useState<number>(0);
    const [uniV2PpblzBalance, setUniV2PpblzBalance] = useState<number>(0);
    const [ppdexBalance, setPpdexBalance] = useState<number>(0);
    const [transactionFinished, setTransactionFinished] = useState<number>(0);
    const [ppblzStakeAdd, setPpblzStakeAdd] = useState<boolean>(false);
    const [ppblzStakeSub, setPpblzStakeSub] = useState<boolean>(false);
    const [uniV2PpblzStakeAdd, setUniV2PpblzStakeAdd] = useState<boolean>(false);
    const [uniV2PpblzStakeSub, setUniV2PpblzStakeSub] = useState<boolean>(false);

    const [pepemon] = useContext(PepemonProviderContext);
    const { account, contracts, provider } = pepemon;
    const [, loadWeb3Modal] = useWeb3Modal();

    const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
    const ppblzEthLpApy = calculatePpblzEthLpApy(ppblzPrice, ppdexPrice);

    const timer: any = useRef(null);
    const horzScroll: any = useRef(null);
    useHorizontalScroll(horzScroll);

    useEffect(() => {
        return () => timer && clearTimeout(timer);
    }, [timer]);

    const resetToInitialStateOnReject = async () => {
        setIsStakingPpblz(false);
        setIsApprovingPpblz(false);
        setIsWithdrawingPpblz(false);
        setIsStakingUniV2Ppblz(false);
        setIsApprovingUniV2Ppblz(false);
        setIsWithdrawingUniV2Ppblz(false);
        setIsClaiming(false);
    };

    const safeFromWei = (value: ethers.BigNumber | string) => {
        try {
            if (typeof value !== 'string') {
                value = value.toString();
            }
            return parseFloat(ethers.utils.formatUnits(value, 'ether'));
        } catch (error) {
            console.error('Error in safeFromWei:', error);
            return 0;
        }
    };

    const getPpblzAllowance = useCallback(async () => {
        try {
            const _ppblzAllowance = await contracts.ppblz.allowance(account, contracts.ppdex.address);
            setPpblzAllowance(safeFromWei(_ppblzAllowance));
            setIsApprovedPpblz(_ppblzAllowance.gt(ethers.BigNumber.from('0')));
        } catch (error) {
            console.error('Error in getPpblzAllowance:', error);
        }
    }, [setPpblzAllowance, account, contracts?.ppblz, contracts?.ppdex?.address]);

    const getUniV2PpblzAllowance = useCallback(async () => {
        try {
            const _uniV2PpblzAllowance = await contracts.uniV2_ppblz.allowance(account, contracts.ppdex.address);
            setUniV2PpblzAllowance(safeFromWei(_uniV2PpblzAllowance));
            setIsApprovedUniV2Ppblz(_uniV2PpblzAllowance.gt(ethers.BigNumber.from('0')));
        } catch (error) {
            console.error('Error in getUniV2PpblzAllowance:', error);
        }
    }, [contracts?.uniV2_ppblz, contracts?.ppdex?.address, setUniV2PpblzAllowance, account]);

    const getPpblzBalance = useCallback(async () => {
        try {
            const _ppblzBalance = await contracts.ppblz.balanceOf(account);
            setPpblzBalance(safeFromWei(_ppblzBalance));
        } catch (error) {
            console.error('Error in getPpblzBalance:', error);
        }
    }, [contracts.ppblz, setPpblzBalance, account]);

    const getUniV2PpblzBalance = useCallback(async () => {
        try {
            const _uniV2PpblzBalance = await contracts.uniV2_ppblz.balanceOf(account);
            setUniV2PpblzBalance(safeFromWei(_uniV2PpblzBalance));
        } catch (error) {
            console.error('Error in getUniV2PpblzBalance:', error);
        }
    }, [contracts.uniV2_ppblz, setUniV2PpblzBalance, account]);

    const getPpdexBalance = useCallback(async () => {
        try {
            const _ppdexBalance = await contracts.ppdex.balanceOf(account);
            setPpdexBalance(safeFromWei(_ppdexBalance));
        } catch (error) {
            console.error('Error in getPpdexBalance:', error);
        }
    }, [contracts.ppdex, setPpdexBalance, account]);

    const getPpblzSupply = useCallback(async () => {
        try {
            const _ppblzSupply = await contracts.ppblz.totalSupply();
            setTotalPpblzSupply(safeFromWei(_ppblzSupply));
        } catch (error) {
            console.error('Error in getPpblzSupply:', error);
        }
    }, [contracts.ppblz, setTotalPpblzSupply]);

    const getUniV2PpblzSupply = useCallback(async () => {
        try {
            const _ppblzSupply = await contracts.uniV2_ppblz.totalSupply();
            setTotalUniV2PpblzSupply(safeFromWei(_ppblzSupply));
        } catch (error) {
            console.error('Error in getUniV2PpblzSupply:', error);
        }
    }, [contracts.uniV2_ppblz, setTotalUniV2PpblzSupply]);

    const getMyPpblzStakeAmount = useCallback(async () => {
        try {
            const stakeA = await contracts.ppdex.getAddressPpblzStakeAmount(account);
            setPpblzStakedAmount(safeFromWei(stakeA));
        } catch (error) {
            console.error('Error in getMyPpblzStakeAmount:', error);
        }
    }, [contracts.ppdex, setPpblzStakedAmount, account]);

    const getMyUniV2PpblzStakeAmount = useCallback(async () => {
        try {
            const stakeA = await contracts.ppdex.getAddressUniV2StakeAmount(account);
            setUniV2PpblzStakedAmount(safeFromWei(stakeA));
        } catch (error) {
            console.error('Error in getMyUniV2PpblzStakeAmount:', error);
        }
    }, [contracts.ppdex, setUniV2PpblzStakedAmount, account]);

    const getPpdexRewards = useCallback(async () => {
        setIsUpdatingRewards(true);
        try {
            const cRewards = await contracts.ppdex.myRewardsBalance(account);
            const ppblzStaked = await contracts.ppdex.getAddressPpblzStakeAmount(account);
            const uniV2Staked = await contracts.ppdex.getAddressUniV2StakeAmount(account);

            let rewardsToSet = cRewards;

            if (ppblzStaked.gt(ethers.BigNumber.from('0')) && uniV2Staked.gt(ethers.BigNumber.from('0'))) {
                const lastRewardBlock = await contracts.ppdex.getLastBlockCheckedNum(account);
                const currentBlock = await contracts.ppdex.getBlockNum();
                const liquidityMultiplier = await contracts.ppdex.getLiquidityMultiplier();
                const rewardsVar = ethers.BigNumber.from('100000');

                const blockDiff = currentBlock.sub(lastRewardBlock);
                const ppblzRewardBalance = ppblzStaked.mul(blockDiff).div(rewardsVar);
                const uniV2RewardsBalance = uniV2Staked.mul(blockDiff).mul(liquidityMultiplier).div(rewardsVar);

                const totalRewards = ppblzRewardBalance.add(uniV2RewardsBalance);

                if (cRewards.gt(ethers.BigNumber.from('10000'))) {
                    const originalReward = cRewards.sub(totalRewards);
                    rewardsToSet = originalReward.div(ethers.BigNumber.from('2')).add(totalRewards);
                }
            }

            setPpdexRewards(safeFromWei(rewardsToSet));
        } catch (error) {
            console.error('Error in getPpdexRewards:', error);
        } finally {
            setTimeout(() => {
                setIsUpdatingRewards(false);
                if (timer.current) {
                    clearTimeout(timer.current);
                }
            }, 2000);
        }
    }, [account, contracts.ppdex]);

    const stakePpblz = async () => {
        if ((isStakingPpblz || !ppblzStakeAmount || parseFloat(ppblzStakeAmount) === 0) || (parseFloat(ppblzStakeAmount) > ppblzBalance)) {
            return;
        }

        setIsStakingPpblz(true);
        try {
            const amount = ethers.utils.parseUnits(ppblzStakeAmount.toString(), 'ether');
            const stakeRes = await sendTransaction(provider,
                async () => await contracts.ppdex.stakePpblz(amount, { gasLimit: 200000 })
            );

            if (stakeRes) {
                setIsStakingPpblz(false);
                setPpblzStakeAmount(null);
                setPpblzStakeAdd(false);
                await getMyPpblzStakeAmount();
                await getPpblzBalance();
                await getPpblzAllowance();
                await getPpdexRewards();
            }
            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.error('Error in stakePpblz:', error);
            await resetToInitialStateOnReject();
        }
    };

    const stakeUniV2Ppblz = async () => {
        if ((isStakingUniV2Ppblz || !uniV2PpblzStakeAmount || parseFloat(uniV2PpblzStakeAmount) === 0) || (parseFloat(uniV2PpblzStakeAmount) > uniV2PpblzBalance)) {
            return;
        }

        setIsStakingUniV2Ppblz(true);
        try {
            const amount = ethers.utils.parseUnits(uniV2PpblzStakeAmount.toString(), 'ether');
            let stakeRes = await sendTransaction(provider, async () => await contracts.ppdex.stakeUniV2(amount, { gasLimit: 200000 }));
            if (stakeRes) {
                setIsStakingUniV2Ppblz(false);
                setUniV2PpblzStakeAmount(null);
                setUniV2PpblzStakeAdd(false);
                await getMyUniV2PpblzStakeAmount();
                await getUniV2PpblzBalance();
                await getUniV2PpblzAllowance();
                await getPpdexRewards();
            }
            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    };

    const withdrawPpblz = async () => {
        if (isWithdrawingPpblz || ppblzStakeAmount === null || parseFloat(ppblzStakeAmount) === 0) {
            return;
        }
        setIsWithdrawingPpblz(true);
        try {
            const amount = ethers.utils.parseUnits(ppblzStakeAmount.toString(), 'ether');
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawPpblz(amount, { gasLimit: 200000 }));

            if (unstakeRes) {
                setIsWithdrawingPpblz(false);
                setPpblzStakeAmount(null);
                setPpblzStakeSub(false);
                await getMyPpblzStakeAmount();
                await getPpblzBalance();
                await getPpblzAllowance();
                await getPpdexRewards();
            } else {
                setIsWithdrawingPpblz(false);
            }

            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    };

    const withdrawUniV2Ppblz = async () => {
        if (isWithdrawingUniV2Ppblz || uniV2PpblzStakeAmount === null || parseFloat(uniV2PpblzStakeAmount) === 0) {
            return;
        }
        setIsWithdrawingUniV2Ppblz(true);
        try {
            const amount = ethers.utils.parseUnits(uniV2PpblzStakeAmount.toString(), 'ether');
            let unstakeRes = await sendTransaction(provider, async () => await contracts.ppdex.withdrawUniV2(amount, { gasLimit: 200000 }));

            if (unstakeRes) {
                setIsWithdrawingUniV2Ppblz(false);
                setUniV2PpblzStakeAmount(null);
                setUniV2PpblzStakeSub(false);
                await getMyUniV2PpblzStakeAmount();
                await getUniV2PpblzBalance();
                await getUniV2PpblzAllowance();
                await getPpdexRewards();
            } else {
                setIsWithdrawingUniV2Ppblz(false);
            }

            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    };

    const approvePpblz = async () => {
        if (isApprovingPpblz) {
            return;
        }
        setIsApprovingPpblz(true);

        try {
            const approveAmount = ppblzStakeAmount && parseFloat(ppblzStakeAmount) > 0
                ? ethers.utils.parseUnits(ppblzStakeAmount.toString(), 'ether')
                : ethers.utils.parseUnits(ppblzBalance.toString(), 'ether');
            let approveStaking = await sendTransaction(provider, async () => await contracts.ppblz.approve(
                contracts.ppdex.address,
                approveAmount
            ));

            await getPpblzAllowance();

            if (approveStaking) {
                setIsApprovingPpblz(false);
                setIsApprovedPpblz(true);
                if (ppblzStakeAmount && parseFloat(ppblzStakeAmount) > 0 && parseFloat(ppblzStakeAmount) <= ppblzBalance) {
                    await stakePpblz();
                }
            } else {
                setIsApprovingPpblz(false);
            }

            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    };

    const approveUniV2Ppblz = async () => {
        if (isApprovingUniV2Ppblz) {
            return;
        }
        setIsApprovingUniV2Ppblz(true);

        try {
            const approveAmount = uniV2PpblzStakeAmount && parseFloat(uniV2PpblzStakeAmount) > 0
                ? ethers.utils.parseUnits(uniV2PpblzStakeAmount.toString(), 'ether')
                : ethers.utils.parseUnits(uniV2PpblzBalance.toString(), 'ether');
            let approveStaking = await sendTransaction(provider, async () => await contracts.uniV2_ppblz.approve(
                contracts.ppdex.address,
                approveAmount
            ));
            await getUniV2PpblzAllowance();

            if (approveStaking) {
                setIsApprovingUniV2Ppblz(false);
                setIsApprovedUniV2Ppblz(true);
                if (uniV2PpblzStakeAmount && parseFloat(uniV2PpblzStakeAmount) > 0 && parseFloat(uniV2PpblzStakeAmount) <= uniV2PpblzBalance) {
                    await stakeUniV2Ppblz();
                }
            } else {
                setIsApprovingUniV2Ppblz(false);
            }

            setTransactionFinished(prev => prev + 1);
        } catch (error) {
            console.log(error);
            await resetToInitialStateOnReject();
        }
    };

    const cleanNumberInput = (value: string, maxDecimals: number) => {
        if (value[0] === '0' && (value[1] && value[1] !== '.')) {
            return value[1];
        }
        if (value.slice(-2) === '..') {
            return value.slice(0, -1);
        }
        if (value.split('.').length > 1 && value.split('.')[1].length > maxDecimals) {
            return `${value.split('.')[0]}.${value.split('.')[1].slice(0, maxDecimals)}`;
        }
        return value;
    };

    const isInvalidInput = (value: string) =>
        !Number(value) &&
        value !== '' &&
        parseFloat(value) !== 0 &&
        value.slice(-1) !== '.' &&
        value.slice(-2) !== '.0';

    /** setters & modifiers */
    const updatePpblzStakingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setPpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    };

    const updateUniV2PpblzStakingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isInvalidInput(e.target.value)) {
            return;
        }
        setUniV2PpblzStakeAmount(cleanNumberInput(e.target.value, 18));
    };

    const setPpblzInputField = () => {
        if (ppblzStakeAmount !== null) {
            return ppblzStakeAmount;
        } else {
            return '';
        }
    };

    const setUniV2PpblzInputField = () => {
        if (uniV2PpblzStakeAmount !== null) {
            return uniV2PpblzStakeAmount;
        } else {
            return '';
        }
    };

    const setMaxPpblz = () => {
        if (ppblzStakeSub) {
            return setPpblzStakeAmount(ppblzStakedAmount.toString());
        }
        return setPpblzStakeAmount(ppblzBalance.toString());
    };

    const setMaxUniV2Ppblz = () => {
        if (uniV2PpblzStakeSub) {
            return setUniV2PpblzStakeAmount(uniV2PpblzStakedAmount.toString());
        }
        return setUniV2PpblzStakeAmount(uniV2PpblzBalance.toString());
    };

    const claimRewards = async () => {
        if (isClaiming) {
            return;
        }

        if (ppdexRewards > 0) {
            setIsClaiming(true);
            try {
                await sendTransaction(provider, async () => await contracts.ppdex.getReward());

                await getPpdexRewards();
                setTransactionFinished(prev => prev + 1);
            } catch (error) {
                console.log(error);
                await resetToInitialStateOnReject();
            }
        }
        setIsClaiming(false);
    };

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
                setIsApprovedPpblz(false);
                setIsApprovedUniV2Ppblz(false);
            } catch (error) {
                alert(`Failed to load web3, accounts, or contract. Check console for details.`);
                console.error(error);
            }
        });
    }, [
        account,
        pepemon,
        contracts,
        provider,
        transactionFinished,
        getMyPpblzStakeAmount,
        getMyUniV2PpblzStakeAmount,
        getPpblzAllowance,
        getPpblzBalance,
        getPpblzSupply,
        getPpdexBalance,
        getPpdexRewards,
        getUniV2PpblzAllowance,
        getUniV2PpblzBalance,
        getUniV2PpblzSupply,
    ]);

    return (
        <StakeGrid>
            <StakeGridTop ref={horzScroll}>
                {/* PPBLZ Staking Section */}
                <StakeGridArea>
                    <StakeGridAreaHeader>
                        <StakeGridAreaHeaderTitle>
                            <img loading="lazy" src={pepeball} alt="Pepeball"/>
                            <Spacer size="sm"/>
                            <Title as="h2" size='m' color={theme.color.white} font={theme.font.neometric} weight={900}>Earn with PPBLZ</Title>
                        </StakeGridAreaHeaderTitle>
                        <StakeGridAreaHeaderMeta>
                            <span>{ppblzApy.toFixed(0)}% APY</span>
                            <IButtonPopover cursor={'pointer'} heading="APY staking PPBLZ"
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
                            {!account &&
                                <Button styling="purple" onClick={loadWeb3Modal} width="100%">Connect wallet</Button>
                            }
                            {account && !ppblzStakeAdd && !ppblzStakeSub &&
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
                            {account &&
                            (ppblzStakeAdd || ppblzStakeSub) &&
                            !isStakingPpblz &&
                            !isWithdrawingPpblz &&
                            !isApprovingPpblz &&
                                <ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
                                    <StyledInput
                                        placeholder="0.00"
                                        value={setPpblzInputField() || ""}
                                        onChange={(event) => updatePpblzStakingInput(event) }
                                        min="0.00"
                                        step="1"
                                        autoFocus={true} />
                                    <Button styling="link" onClick={setMaxPpblz}>Max</Button>
                                    {(ppblzAllowance <= 0 || ppblzAllowance < parseFloat(ppblzStakeAmount || '0')) && !ppblzStakeSub
                                        ? <Button styling="purple"
                                            onClick={approvePpblz}
                                            disabled={!ppblzStakeAmount || parseFloat(ppblzStakeAmount) <= 0 || isUpdatingRewards}
                                          >Enable</Button>
                                        : ppblzStakeSub && !ppblzStakeAdd
                                            ? <Button styling="purple"
                                                onClick={withdrawPpblz}
                                                disabled={!(parseFloat(ppblzStakeAmount || '0') > 0 && parseFloat(ppblzStakeAmount || '0') <= ppblzStakedAmount) || isWithdrawingPpblz}
                                              >Withdraw</Button>
                                            : <Button styling="purple"
                                                onClick={stakePpblz}
                                                disabled={!(parseFloat(ppblzStakeAmount || '0') > 0 && parseFloat(ppblzStakeAmount || '0') <= ppblzBalance) || isStakingPpblz}
                                              >Stake</Button>
                                    }
                                </ContentCentered>
                            }
                            {account && (isApprovingPpblz || isStakingPpblz || isWithdrawingPpblz) &&
                                <Button styling="purple" width="100%" disabled>
                                    {isApprovingPpblz && "Enabling"}
                                    {isStakingPpblz && "Staking"}
                                    {isWithdrawingPpblz && "Withdrawing"}
                                ...</Button>
                            }
                        </div>
                    </StakeGridAreaBody>
                </StakeGridArea>

                {/* UniV2PPBLZ LP Staking Section */}
                <StakeGridArea>
                    <StakeGridAreaHeader>
                        <StakeGridAreaHeaderTitle>
                            <img loading="lazy" src={uniswap} alt="Uniswap"/>
                            <Spacer size="sm"/>
                            <Title as="h2" size='m' color={theme.color.white} font={theme.font.neometric} weight={900}>Earn with PPBLZ LP</Title>
                        </StakeGridAreaHeaderTitle>
                        <StakeGridAreaHeaderMeta>
                            <span>{ppblzEthLpApy.toFixed(0)}% APY</span>
                            <IButtonPopover cursor={'pointer'} heading="APY staking PPBLZ LP"
                                apy={ppblzEthLpApy}
                                ppdexPrice={ppdexPrice}
                                button={{ href: "https://app.uniswap.org/#/add/0x4D2eE5DAe46C86DA2FF521F7657dad98834f97b8/ETH", text: 'Add PPBLZ LP' }}/>
                        </StakeGridAreaHeaderMeta>
                    </StakeGridAreaHeader>
                    <StakeGridAreaBody>
                        <DataColumns>
                            <DataColumn>
                                <Text as="p" size="m" font={theme.font.inter}>PPBLZ LP balance</Text>
                                <Spacer size="sm"/>
                                <Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(uniV2PpblzBalance.toString()).toFixed(2)}</Text>
                            </DataColumn>
                            <DataColumn>
                                <Text as="p" size="m" font={theme.font.inter}>PPBLZ LP staked</Text>
                                <Spacer size="sm"/>
                                <Text as="p" font={theme.font.neometric} weight={900} size='xl'>{parseFloat(uniV2PpblzStakedAmount.toString()).toFixed(2)}</Text>
                            </DataColumn>
                        </DataColumns>
                        <div style={{ marginTop: "auto" }}>
                            {!account &&
                                <Button styling="purple" onClick={loadWeb3Modal} width="100%">Connect wallet</Button>
                            }
                            {account && !uniV2PpblzStakeAdd && !uniV2PpblzStakeSub &&
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
                            {account &&
                            (uniV2PpblzStakeAdd || uniV2PpblzStakeSub) &&
                            !isStakingUniV2Ppblz &&
                            !isWithdrawingUniV2Ppblz &&
                            !isApprovingUniV2Ppblz &&
                                <ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[700]}`, padding: ".1em .1em .1em 0.75em" }}>
                                    <StyledInput
                                        placeholder="0.00"
                                        value={setUniV2PpblzInputField() || ""}
                                        onChange={(event) => updateUniV2PpblzStakingInput(event) }
                                        min="0.00"
                                        step="1"
                                        autoFocus={true} />
                                    <Button styling="link" onClick={setMaxUniV2Ppblz}>Max</Button>
                                    {(uniV2PpblAllowance <= 0 || uniV2PpblAllowance < parseFloat(uniV2PpblzStakeAmount || '0')) && !uniV2PpblzStakeSub
                                        ? <Button styling="purple"
                                            onClick={approveUniV2Ppblz}
                                            disabled={!uniV2PpblzStakeAmount || parseFloat(uniV2PpblzStakeAmount) <= 0 || isUpdatingRewards}
                                          >Enable</Button>
                                        : uniV2PpblzStakeSub && !uniV2PpblzStakeAdd
                                            ? <Button styling="purple"
                                                onClick={withdrawUniV2Ppblz}
                                                disabled={!(parseFloat(uniV2PpblzStakeAmount || '0') > 0 && parseFloat(uniV2PpblzStakeAmount || '0') <= uniV2PpblzStakedAmount) || isWithdrawingUniV2Ppblz}
                                              >Withdraw</Button>
                                            : <Button styling="purple"
                                                onClick={stakeUniV2Ppblz}
                                                disabled={!(parseFloat(uniV2PpblzStakeAmount || '0') > 0 && parseFloat(uniV2PpblzStakeAmount || '0') <= uniV2PpblzBalance) || isStakingUniV2Ppblz}
                                              >Stake</Button>
                                    }
                                </ContentCentered>
                            }
                            {account && (isApprovingUniV2Ppblz || isStakingUniV2Ppblz || isWithdrawingUniV2Ppblz) &&
                                <Button styling="purple" width="100%" disabled>
                                    {isApprovingUniV2Ppblz && "Enabling"}
                                    {isStakingUniV2Ppblz && "Staking"}
                                    {isWithdrawingUniV2Ppblz && "Withdrawing"}
                                ...</Button>
                            }
                        </div>
                    </StakeGridAreaBody>
                </StakeGridArea>
            </StakeGridTop>

            {/* PPDEX Earned Section */}
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

                        <Button style={{ gridArea: 'area3' }} styling="purple" disabled={!account ? false : (isStakingPpblz || isWithdrawingPpblz) || isUpdatingRewards || (!(ppblzStakedAmount > 0) && (!(ppdexRewards > 0.1) || isClaiming))} onClick={!account ? loadWeb3Modal : claimRewards} width="clamp(100px, 18em, 100%)">{!account ? "Connect wallet" : (isStakingPpblz || isWithdrawingPpblz || isUpdatingRewards) ? "Updating..." : isClaiming ? "Claiming..." : `${ppdexRewards.toFixed(2)} PPDEX to claim`}</Button>
                    </ClaimGrid>
                </StakeGridAreaBody>
            </StakeGridArea>
        </StakeGrid>
    );
};

// Styled components
const StakeGrid = styled.section``;

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

export default StakeCard;
