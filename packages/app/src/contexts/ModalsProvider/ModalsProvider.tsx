import React, { createContext, useCallback, useState } from 'react'
import styled from 'styled-components'

interface ModalsContext {
  content?: React.ReactNode,
  isOpen?: boolean,
  onPresent: (content: React.ReactNode, key?: string) => void,
  onDismiss: () => void
}

export const Context = createContext<ModalsContext>({
  onPresent: () => {},
  onDismiss: () => {},
})

const ModalsProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode>()
  const [, setModalKey] = useState<string>()

  const handlePresent = useCallback((modalContent: React.ReactNode, key?: string) => {
    setModalKey(key)
    setContent(modalContent)
    setIsOpen(true)
  }, [setContent, setIsOpen, setModalKey])

  const handleDismiss = useCallback(() => {
    setContent(undefined)
    setIsOpen(false)
  }, [setContent, setIsOpen])

  return (
    <Context.Provider value={{
      content,
      isOpen,
      onPresent: handlePresent,
      onDismiss: handleDismiss,
    }}>
      {children}
      {isOpen && (
        <StyledModalWrapper>
          <StyledModalBackdrop onClick={handleDismiss} />
          {React.isValidElement(content) && React.cloneElement(content, {
            onDismiss: handleDismiss,
          })}
        </StyledModalWrapper>
      )}
    </Context.Provider>
  )
}

const StyledModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 1000;
  top: 0; right: 0; bottom: 0; left: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    align-items: unset;
  }

`

const StyledModalBackdrop = styled.div`

  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
`

export default ModalsProvider;
