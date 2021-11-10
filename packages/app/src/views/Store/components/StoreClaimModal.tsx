import React from 'react';
import { Button, Modal, ModalTitle, ModalContent, ModalActions, Text, Spacer } from '../../../components';
import { theme } from '../../../theme';

const StoreClaimModal: React.FC<any> = ({disabled, dismiss, claimButtonText, claimButtonClick}) => {
	return (
		<Modal rounded onDismiss={dismiss} maxWidth={theme.page.maxWidth}>
		    <ModalTitle text="Claim ice pack" />
			<ModalContent>
				<Text as="p" font={theme.font.inter} size='s' color={theme.color.gray[600]}>
		  			Claim this item.
				</Text>
			</ModalContent>
			<Spacer size="md"/>
			<ModalActions>
				<Button styling="white" onClick={() => dismiss()}>Cancel</Button>
				<Button disabled={disabled} styling="purple" onClick={claimButtonClick}>{claimButtonText}</Button>
			</ModalActions>
		</Modal>
	)
}

export default StoreClaimModal;
