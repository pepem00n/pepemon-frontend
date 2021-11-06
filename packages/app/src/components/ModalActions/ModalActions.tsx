import React from 'react'
import styled from 'styled-components/macro'

import Spacer from '../Spacer'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <div>
            {child}
          </div>
          {i < l - 1 && <Spacer size='sm'/>}
        </>
      ))}
    </StyledModalActions>
  )
}

const StyledModalActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  width: 100%;
`

export default ModalActions
