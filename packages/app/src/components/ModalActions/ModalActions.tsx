import React from 'react'
import styled from 'styled-components'

import Spacer from '../Spacer'

const ModalActions: React.FC = ({ children }) => {
  const l = React.Children.toArray(children).length
  return (
    <StyledModalActions>
      {React.Children.map(children, (child, i) => (
        <>
          <StyledModalAction>
            {child}
          </StyledModalAction>
          {i < l - 1 && <Spacer size='sm'/>}
        </>
      ))}
    </StyledModalActions>
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
