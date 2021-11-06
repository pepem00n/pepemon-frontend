import React from 'react';
import { Title } from '../../../components';
import { ActionClose } from '../../../assets';
import { theme } from '../../../theme';
import { StyledStoreWrapper, StyledStoreHeader } from '../components';

const StoreAside = ({children, close, title}) => {
	return (
		<StyledStoreWrapper width="34%">
			<div style={{position: 'sticky', top: '1em'}}>
				<StyledStoreHeader>
					<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
						<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size='s'>
							{title}
						</Title>
						<ActionClose onClick={close}/>
					</div>
				</StyledStoreHeader>
				{children}
			</div>
		</StyledStoreWrapper>
	)
}

export default StoreAside;
