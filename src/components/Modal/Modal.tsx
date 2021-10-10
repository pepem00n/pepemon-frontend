import React from "react";
import styled, { keyframes } from "styled-components";
import { ActionClose } from '../../assets';
import { theme } from '../../theme';

export interface ModalProps {
  onDismiss?: () => void;
  maxWidth?: number;
  rounded?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children , onDismiss, maxWidth}) => {
  return (
    <StyledResponsiveWrapper>
        <StyledModal maxWidth={maxWidth}>
            {onDismiss && <ActionClose onClick={() => onDismiss()}/>}
            {children}
        </StyledModal>
    </StyledResponsiveWrapper>
  );
};

const mobileKeyframes = keyframes`
  0% {
      opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 10;
  animation: ${mobileKeyframes} 0.3s forwards ease-in;
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

const StyledModal = styled.div<ModalProps>`
  padding: 40px;
  background-color: ${props => props.theme.color.white};
  border-radius: ${props => props.rounded ? "32px" : "10px"};
  box-shadow: 0 5px 10px 0px ${theme.color.colorsLayoutShadows};
  display: flex;
  flex-direction: column;
  max-width: ${(props) => props.maxWidth ? props.maxWidth : 800}px;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 0;
`;

export default Modal;
