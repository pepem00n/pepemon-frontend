import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps, Spacer } from '../../components';

interface ModalActionProps {
	text: string,
	buttonProps: ButtonProps,
}

export interface ModalActionsProps {
	modalActions?: ModalActionProps[],
}

const ModalActions: React.FC<ModalActionsProps> = ({ modalActions }) => {
	const l = modalActions.length;

	return (
		<div>
			{modalActions.map((modalAction, i) => (
				<StyledModalActions key={i}>
					<StyledModalAction>
						<Button {...modalAction.buttonProps}>{modalAction.text}</Button>
					</StyledModalAction>
					{i < l - 1 && <Spacer size='sm'/>}
				</StyledModalActions>
			))}
		</div>
	)
}

const StyledModalActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  width: 100%;
`

const StyledModalAction = styled.div`
	display: block;
	margin-bottom: 1em;
	width: fit-content;

	a {
		display: block;
	}
`

export default ModalActions
