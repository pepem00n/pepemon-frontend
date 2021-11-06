import React, { useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { isMobile } from 'web3modal';
import { Button, ExternalLink, Modal, ModalTitle, ModalContent, ModalActions, ModalProps, NetworkSwitch, Spacer, Text } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { useWeb3Modal } from '../../../hooks';
import { theme } from '../../../theme';
import { chains } from '../../../constants';
import { copyText } from '../../../utils';

interface WalletModal extends ModalProps {
	account: string,
	setChainId?: () => void,
	ppblzBalance?: any,
	nativeBalance?: string,
	totalPpblz?: string,
	totalPpdex?: string
	ppmnCardsOwned?: number
}

const WalletModal: React.FC<WalletModal> = ({onDismiss, account, setChainId, ppblzBalance, nativeBalance, totalPpblz, totalPpdex, ppmnCardsOwned}) => {
	const [copied, setCopied] = useState(false);
	const [{chainId}] = useContext(PepemonProviderContext);
	const [,,logoutOfWeb3Modal] = useWeb3Modal();

	const handleCopy = () => {
		copyText(account);
		setCopied(true);
	}

	const handleLogout = async () => {
		await logoutOfWeb3Modal();
		onDismiss();
	}

	const [currentChain] = chains.filter(chain => (parseInt(chain.chainId) === chainId) && chain.chainName);

    return (
        <Modal onDismiss={onDismiss}>
            <ModalTitle text='Your wallet' />
			<ModalContent>
				{ ppblzBalance &&
					<StyledTextInfos>
						{ isMobile() &&
							<>
								<dt>Change network:</dt>
								<dd><NetworkSwitch {...{appChainId: chainId, providerChainId: chainId}}/></dd>
							</>
						}
						<dt>Native balance</dt>
						<dd>{nativeBalance}</dd>
						<dt>In Wallet + Staked PPBLZ</dt>
						<dd>{totalPpblz}</dd>
						<dt>In Wallet + Not Claimed PPDEX</dt>
						<dd>{totalPpdex}</dd>
						<dt>Unique card{ppmnCardsOwned !== 1 && 's'}</dt>
						<dd>{ppmnCardsOwned}</dd>
					</StyledTextInfos>
				}
				<CustomText font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
					View your account on <ExternalLink href={`${currentChain?.blockExplorerUrls}/address/${account}`}>{currentChain?.blockExplorerTitle}</ExternalLink>
				</CustomText>
			</ModalContent>
			<Spacer size='md'/>
            <ModalActions>
				<Button styling='purple' onClick={handleCopy}>{copied ? 'Copied!' : 'Copy address'}</Button>
				<Button styling='white' onClick={handleLogout}>{'Log out'}</Button>
            </ModalActions>
        </Modal>
    )
}

export const StyledTextInfos = styled.dl`
	&{
		font-family: ${theme.font.inter};
		margin-bottom: 0;
	}

	& dt {
		color: ${theme.color.gray[300]};
		font-size: .8rem;
		text-transform: uppercase;
		letter-spacing: 1.2px;
	}

	& dd {
		color: ${theme.color.gray[600]};
		font-size: 1.2rem;
		font-weight: bold;
		margin-bottom: 1em;
		margin-left: 0;
		margin-top: .2em;
	}
`

const CustomText = styled(Text)`
	@media (min-width: ${theme.breakpoints.tabletL}) {
		text-align: center;
	}
`

export default WalletModal
