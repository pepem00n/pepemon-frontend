import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'

interface ValueProps {
  value: string | number
  decimals?: number
  size?: 'small' | 'medium'
}

const Value: React.FC<ValueProps> = ({ value, decimals, size }) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  useEffect(() => {
    if (typeof value === 'number') {
      updateStart(end)
      updateEnd(value)
    }
  }, [value, end])

  return (
    <StyledValue
        size={size || 'default'}
    >
      {typeof value == 'string' ? (
        value
      ) : (
        <CountUp
          start={start}
          end={end}
          decimals={
            // decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e5 ? 0 : 3
            2
          }
          duration={1}
          separator=","
        />
      )}
    </StyledValue>
  )
}

interface StyledValueProps {
	size?: 'small' | 'medium' | 'default',
}

const StyledValue = styled.span<StyledValueProps>`
  font-size: ${(props) => props.size === 'small' ? 14 : props.size === 'medium' ? 26 : 36}px;
  font-weight: ${(props) => props.size === 'small' ? 400 : 700};
`

export default Value
