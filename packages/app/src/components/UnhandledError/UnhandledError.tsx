import React from 'react';
import { ModalProps, Modal, ModalTitle, ModalContent, ModalActions, Text, Spacer } from '../../components';
import { theme } from '../../theme';

interface UnhandledErrorProps extends ModalProps {
	errCode?: number,
	errMsg: string
}

const UnhandledError: React.FC<UnhandledErrorProps> = ({errCode, errMsg, onDismiss}) => {
	const title = errCode ? `Error ${errCode}` : 'Unknown error';

	return (
		<Modal onDismiss={onDismiss}>
			<ModalTitle text={title}/>
			<ModalContent>
				<Text align='center' font={theme.font.inter} size='s' color={theme.color.gray[600]}>
					{errMsg}
				</Text>
			</ModalContent>
			<Spacer size='md'/>
			<ModalActions modalActions={[
				{
					text: 'Report on GitHub',
					href: `https://github.com/pepem00n/pepemon-frontend/issues/new?title=Error:%20${title}:%20${errMsg}&body=%0A%0A%0A---%0AI%27m+a+human.+Please+be+nice.`,
					buttonProps: {
						styling: 'button',
					}
				},
				{
					text: 'Reload',
					buttonProps: {
						styling: 'white',
						onClick: () => window.location.reload()
					}
				}
			]}/>
		</Modal>
	)
}

export default UnhandledError;
