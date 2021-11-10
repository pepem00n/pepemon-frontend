import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.375rem;
  font-weight: 700;
  justify-content: center;
`

export default ModalTitle
