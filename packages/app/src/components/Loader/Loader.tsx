import React from 'react'
import styled, { keyframes } from 'styled-components'

import CardIcon from '../CardIcon'

interface LoaderProps {
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <StyledLoader>
      <CardIcon>
        <StyledPepemon><img src={'pepeballImg'} alt="pepeballImg" style={{ height: 32 }}/></StyledPepemon>
      </CardIcon>
      {!!text && <StyledText>{text}</StyledText>}
    </StyledLoader>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const StyledPepemon = styled.div`
  font-size: 32px;
  position: relative;
  animation: 1s ${spin} infinite;
`

const StyledText = styled.div`

`

export default Loader
