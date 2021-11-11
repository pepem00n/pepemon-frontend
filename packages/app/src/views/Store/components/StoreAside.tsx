import React from 'react';
import styled from 'styled-components';
import { Title } from '../../../components';
import { ActionClose } from '../../../assets';
import { theme } from '../../../theme';
import { StyledStoreWrapper, StyledStoreHeader } from '../components';

const StoreAside = ({children, close, title}) => {
	return (
		<StyledStoreWrapper width="34%">
			<StyledStoreAsideInner>
				<StyledStoreHeader>
					<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
						<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size='s'>
							{title}
						</Title>
						<ActionClose onClick={close}/>
					</div>
				</StyledStoreHeader>
				{children}
			</StyledStoreAsideInner>
		</StyledStoreWrapper>
	)
}

const StyledStoreAsideInner = styled.div`
	@media (min-width: ${theme.breakpoints.mobileS}) and (max-width: ${theme.breakpoints.tabletL}) {
		padding-top: 1em;
	}

	@media (max-width: ${theme.breakpoints.tabletL}) {
		padding-bottom: 1em;
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		position: sticky;
		top: 1em;
	}
`

export default StoreAside;
