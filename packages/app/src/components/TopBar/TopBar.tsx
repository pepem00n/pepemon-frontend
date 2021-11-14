import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { isMobile } from 'web3modal';
import BigNumber from 'bignumber.js';
import { useModal, useWeb3Modal, useTokenBalance } from '../../hooks';
import { copyText, getNativeBalance, getNativeToken, getBalanceNumber, formatAddress } from '../../utils';
import { getBalanceOfBatch } from '../../utils/erc1155';
import { Button, Text } from '../../components';
import { NetworkSwitch, WalletModal } from './components';
import { PepemonProviderContext } from '../../contexts';
import { theme } from '../../theme';

const TopBar: React.FC<any> = () => {
	const [copied, setCopied] = useState(false);
	const [nativeBalance, setNativeBalance] = useState(new BigNumber(0));
	const [ppblzStakedAmount, setPpblzStakedAmount] = useState(0);
	const [ppdexRewards, setPpdexRewards] = useState(0);
	const [ppmnCardsOwned, setPpmnCardsOwned] = useState(0);
	const [, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
	const [pepemon] = useContext(PepemonProviderContext);

	const { account, chainId, ppblzAddress, ppdexAddress, contracts, provider } = pepemon;
	const web3 = new Web3(provider);
	// define balances
	useEffect(() => {
		if (!provider) return;
		(async () => {
			const balance = new BigNumber( await getNativeBalance(provider, account) );
			setNativeBalance(balance);
		})();
	}, [chainId, provider, account]);

	const ppblzBalance = useTokenBalance(ppblzAddress);
	const ppdexBalance = useTokenBalance(ppdexAddress);

	// @dev dirty fix: set IDs from 0 to 100
	// TODO: Get all real existing IDs
	// get all tokenIds from cards
	// const tokenIds = cards.get(chainId)?.reduce(function(pv: any, cv: any) {
		// 		return pv.length ? [...pv, ...cv.cards] : [...cv.cards];
		// }, 0);
	// const batchBalanceIds = (chainId === 1 && tokenIds) ? [...tokenIds, ...PPMNONE_ANNIVERSARY_SET.cards] : tokenIds ? [...tokenIds] : [];
	const batchBalanceIds = Array.from(Array(100).keys());

	useEffect(() => {
		(async () => {
			if (!contracts.pepemonFactory) return;
			const batchBalance = await getBalanceOfBatch(contracts.pepemonFactory, account, batchBalanceIds);
			if (batchBalance) {
				// sum of all cards owned
				const sum = batchBalance.reduce((pv, cv) => parseInt(pv) + parseInt(cv), 0);
				setPpmnCardsOwned(sum);
			}
		})()
	}, [contracts.pepemonFactory, chainId, account, batchBalanceIds])

	useEffect(() => {
		setPpdexRewards(0);

		(async () => {
			if(!contracts.ppdex) return;
			// No staking on BSC
			if (chainId !== 56) {
				// Get staked PPBLZ
		        const stakeA = await contracts.ppdex.getAddressPpblzStakeAmount(account);
		        setPpblzStakedAmount(parseFloat(web3.utils.fromWei(stakeA.toString())));

				// Get PPDEX rewards
				const cRewards = (await contracts.ppdex.myRewardsBalance(account)).toString();
				setPpdexRewards(parseFloat(web3.utils.fromWei(cRewards)));
			} else {
				setPpblzStakedAmount(0);
				setPpdexRewards(0);
			}
	    })()
	}, [contracts.ppdex, setPpblzStakedAmount, chainId, account, web3.utils]);

	const totalPpblz = getBalanceNumber(ppblzBalance) + ppblzStakedAmount;
	const totalPpdex = getBalanceNumber(ppdexBalance) + ppdexRewards;


	const handleWalletButtonClick = () => {
		if (account) {
			handlePresent();
		} else {
			loadWeb3Modal();
		}
	}

	const handleCopy = () => {
		copyText(account);
		setCopied(true);
	}

	const handleLogout = async () => {
		await logoutOfWeb3Modal();
		onDismiss();
	}

	const [handlePresent, onDismiss] = useModal({
		title: 'Your wallet',
		content: <WalletModal account={account}
				{...isMobile() && {
					ppblzBalance: ppblzBalance,
					nativeBalance: `${getBalanceNumber(nativeBalance).toFixed(2)} $${getNativeToken(chainId)}`,
					totalPpblz: `${totalPpblz.toFixed(2)} $PPBLZ`,
					totalPpdex: `${totalPpdex.toFixed(2)} $PPDEX`,
					ppmnCardsOwned: ppmnCardsOwned
				}}/>,
		modalActions: [
			{
				text: copied ? 'Copied!' : 'Copy address',
				buttonProps: { styling: 'purple', onClick: handleCopy }
			},
			{
				text: 'Log out',
				buttonProps: { styling: 'white', onClick: handleLogout }
			}
		]
	});

	return (
		<StyledTopBar {...((account && !isMobile()) && {border: true})}>
			<StyledTopBarInner>
				{(account && !isMobile()) &&
					<StyledTopBarInfo>
						<TextInfo as='div' style={{ borderRight: '1px solid currentColor' }}>
							<NetworkSwitch {...{appChainId: chainId, providerChainId: chainId}}/>
						</TextInfo>
						<TextInfo title='Native balance'>
							{getBalanceNumber(nativeBalance).toFixed(2)} ${getNativeToken(chainId)}
						</TextInfo>
						{ppblzBalance && (
							<>
								<TextInfo title='In Wallet + Staked PPBLZ'>
									{totalPpblz.toFixed(2)} $PPBLZ
								</TextInfo>
								<TextInfo title='In Wallet + Not Claimed PPDEX'>
									{totalPpdex.toFixed(2)} $PPDEX
								</TextInfo>
							</>
						)}
						<TextInfo title={`${ppmnCardsOwned} unique card${ppmnCardsOwned !== 1 && 's'}`}>{ppmnCardsOwned} unique card{ppmnCardsOwned !== 1 && 's'}</TextInfo>
					</StyledTopBarInfo>
				}
				<Button styling='green' title={account ? 'Your wallet' : 'Connect wallet'} onClick={handleWalletButtonClick}>{!account ? 'Connect wallet' : formatAddress(account)}</Button>
			</StyledTopBarInner>
		</StyledTopBar>
	);
};

const StyledTopBar = styled.div<{border?: boolean}>`
	background-color: ${props => props.border && 'rgba(255, 255, 255, .6)'};
	border-radius: 10px;
	border: ${props => props.border && `1px solid ${theme.color.purple[800]}`};
	padding: ${props => props.border && '.25em'};
	position: fixed;
	right: .6em;
	top: 1em;
	z-index: 40;

	@media (min-width: ${theme.breakpoints.desktop}) {
		position: absolute;
		right: 2.5em;
		top: 2em;
	}
`

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
`

const StyledTopBarInfo = styled.div`
	align-items: center;
	display: none;

	@media (min-width: ${theme.breakpoints.desktop}) {
		display: flex;
	}
`

const TextInfo = styled(Text)`
	color: ${theme.color.purple[800]};
	font: ${theme.font.spaceMace};
	padding: .4em 1em;
`

export default TopBar;
