import React from 'react';
import { ModalProps, Modal, ModalTitle, ModalContent, Text, ExternalLink, Spacer, ModalActions, Button } from '../../components';
import { theme } from '../../theme';

interface UnhandledErrorProps extends ModalProps {
	errCode: number,
	errMsg: string
}

const UnhandledError: React.FC<UnhandledErrorProps> = ({errCode, errMsg, onDismiss}) => {
	return (
		<Modal onDismiss={onDismiss}>
			<ModalTitle text={`Error ${errCode}`}/>
			<ModalContent>
				<Text align='center' font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
					{errMsg}
				</Text>
			</ModalContent>
			<Spacer size='md'/>
			<ModalActions>
				<ExternalLink styling='button' href={`https://github.com/pepem00n/pepemon-frontend/issues/new?title=Error:%20${errCode}:%20${errMsg}&body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.`}>Report on GitHub</ExternalLink>
				<Button styling='white' onClick={() => window.location.reload()}>Reload</Button>
			</ModalActions>
		</Modal>
	)
}

export default UnhandledError;
