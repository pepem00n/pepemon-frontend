import * as React from "react"
import styled from 'styled-components';

const ActionClose = (props: any) => {
  return (
    <StyledActionClose width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" opacity={0.75}>
        <circle fill="#F2F2F2" cx={12} cy={12} r={12} />
        <path
          d="M7.724 7.73a.907.907 0 00-.063 1.2l.076.087 2.987 2.986L7 15.727 8.273 17l3.724-3.724 3.168 3.169a.91.91 0 001.286.013.907.907 0 00.063-1.2l-.077-.086-3.167-3.17L17 8.273 15.727 7l-3.73 3.73L9.01 7.744a.91.91 0 00-1.286-.013z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </StyledActionClose>
  )
}

const StyledActionClose = styled.svg<{width: number, height: number, xmlns: string}>`
    &:hover {
        cursor: pointer;
    }
`

export default ActionClose;
