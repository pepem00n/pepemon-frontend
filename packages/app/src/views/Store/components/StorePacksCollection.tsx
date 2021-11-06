import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { packs } from '../../../constants';
import { theme } from '../../../theme';
// import { useCardsMetadata, useCardsFactoryData, useCardsStorePrices, useApprove, useAllowance, useTokenBalance } from '../../../hooks';
import { PackSingle, StyledStoreCardsWrapper } from '../components';

const StorePacksCollection : React.FC<any> = ({selectedPack, setSelectedPack}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;
	const [activeSeries, setActiveSeries] = useState([]);

	useEffect(() => {
		setActiveSeries(packs.get(chainId));
		// TODO: Handle url to switch actice cards to boosterpacks
	},[chainId])

	return (
		<>{activeSeries.map((activeSerie, key) => {
			return (
				<div key={key}>
					<Title as="h3" size='m' font={theme.font.spaceMace}>{activeSerie.title}</Title>
					<Spacer size="sm"/>
					<StyledStoreCardsWrapper gridCols={selectedPack ? 3 : 5}>
						{activeSerie.packs.map((pack, key) => {
							return <PackSingle key={key}
										packId={`${activeSerie.title_formatted}_${key}`}
										selectedPack={selectedPack}
										selectPack={setSelectedPack}
										chainId={chainId}
										packMeta={pack}/>
						})}
					</StyledStoreCardsWrapper>
					<Spacer size="md"/>
				</div>
			)
		})}</>
	)
}

export default StorePacksCollection;
