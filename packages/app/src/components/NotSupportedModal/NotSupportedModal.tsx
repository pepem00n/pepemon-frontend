import React, { useState } from 'react';
import { UnhandledError, Button, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from '../../components';
import { theme } from '../../theme';

const NotSupportedModal: React.FC<{page: string}> = ({ page }) => {
	const [unhandledError, setUnhandledError] = useState({errCode: null, errMsg: ''})

	const handleSwitch = async () => {
		try {
			await window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x1' }],
			});
		} catch (error: any) {
			setUnhandledError({
				errCode: error.code,
				errMsg: error.message
			})
		}
	}

    return (<>{ unhandledError.errCode ?
		<UnhandledError
			errCode={unhandledError.errCode}
			errMsg={unhandledError.errMsg}
			onDismiss={() => setUnhandledError({errCode: null, errMsg: ''})}/>
		:
        <Modal>
            <ModalTitle text='Not (yet) supported' />
            <ModalContent>
				<Text align='center' font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
                	{`Your chosen network is currently not supported on the ${page} page.`}
					<br/>
					Please change your wallet provider's network to ETH.
				</Text>
            </ModalContent>
			<Spacer size='md'/>
            <ModalActions>
                <Button styling='purple' onClick={handleSwitch}>Switch to ETH</Button>
            </ModalActions>
        </Modal>
    }</>)
}

export default NotSupportedModal
