import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Logo: React.FC = () => {
  return (
    <StyledLogo to="/">
      <img src={'pepeballImg'} height="32" style={{ marginTop: -4 }} alt="pepeball"/>
      <StyledText>
        PEPEMON.finance
      </StyledText>
    </StyledLogo>
  )
}

const StyledLogo = styled(Link)`
  align-items: center;
  display: flex;
  // justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

const StyledText = styled.span`
  color: ${(props) => props.theme.color[2]};
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-left: ${(props) => props.theme.spacing[1] + props.theme.spacing[2]}px;
  @media (max-width: 400px) {
    display: flex;
  }
`

export default Logo
