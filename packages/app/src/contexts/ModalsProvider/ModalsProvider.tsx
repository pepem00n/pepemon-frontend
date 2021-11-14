import React, { createContext, useCallback, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useOutsideClick } from '../../hooks';
import { theme } from '../../theme';
import { ActionClose } from '../../assets';
import { ModalActions,
	//ModalActionsProps
} from '../../components';

interface ModalProps {
	maxWidth?: number;
}

export interface ModalData extends ModalProps {
	title?: React.ReactNode|string,
	content?: React.ReactNode,
	modalActions?: any
}

interface ModalsContext {
	data?: ModalData,
	isOpen?: boolean,
	onPresent: (content: React.ReactNode, key?: string) => void,
	onDismiss: () => void
}

export const Context = createContext<ModalsContext>({
	data: {},
	onPresent: () => {},
	onDismiss: () => {},
})

const ModalsProvider: React.FC = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<ModalData>();
	const [, setModalKey] = useState<string>();

	const handlePresent = useCallback((modalData: any, key?: string) => {
		setModalKey(key)
		setData(modalData)
		setIsOpen(true)
	}, [setData, setIsOpen, setModalKey])

	const handleDismiss = useCallback(() => {
		setData(undefined)
		setIsOpen(false)
	}, [setData, setIsOpen])

	const modalRef = useRef(null);
	useOutsideClick(modalRef, () => isOpen && handleDismiss());

	return (
		<Context.Provider value={{
			data,
			isOpen,
			onPresent: handlePresent,
			onDismiss: handleDismiss,
		}}>
			{children}
			{(data && isOpen) && (
				<ResponsiveWrapper>
					<Modal ref={modalRef} maxWidth={data.maxWidth}>
						<ActionClose onClick={handleDismiss} />
						{ data.title && <ModalTitle>{data.title}</ModalTitle> }
						<ModalContent>
							{React.isValidElement(data.content) && React.cloneElement(data.content, {
								onDismiss: handleDismiss,
							})}
						</ModalContent>
						{ data.modalActions && <ModalActions modalActions={data.modalActions}/> }
					</Modal>
				</ResponsiveWrapper>
			)}
		</Context.Provider>
	)
}

const mobileKeyframes = keyframes`
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
`;

const ResponsiveWrapper = styled.div`
	align-items: center;
	animation: ${mobileKeyframes} 0.3s forwards ease-in;
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	left: 0;
	padding: 1em;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: 10;

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
		flex: 1;
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		animation: ${mobileKeyframes} 0.3s forwards ease-out;
		max-width: 100vw;
	}

	& svg:first-child {
		position: absolute;
		top: 1em;
		right: 1em;
		z-index: 10;
	}
`;

const Modal = styled.div<ModalProps>`
	padding: 1.5em;
	background-color: ${props => props.theme.color.white};
	border-radius: 32px;
	box-shadow: 0 5px 10px 0px ${theme.color.colorsLayoutShadows};
	display: flex;
	flex-direction: column;
	max-width: ${(props) => props.maxWidth ? props.maxWidth : 800}px;
	align-items: center;
	position: relative;
	width: 100%;
	min-height: 0;
`;

const ModalTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.375rem;
  font-weight: 700;
  justify-content: center;
`

const ModalContent = styled.div`
	padding: ${(props) => props.theme.spacing[2]}px;
`

export default ModalsProvider;
