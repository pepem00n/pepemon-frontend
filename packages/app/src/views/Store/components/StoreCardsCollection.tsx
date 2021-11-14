import React, { useEffect, useState, useContext } from 'react';
import { Title, Spacer, DropdownMenu,
	// Button
} from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { cards } from '../../../constants';
import { theme } from '../../../theme';
import { CardSingle, StyledStoreCardsWrapper, StyledStoreCardsInner, StoreSelectionWrapper } from '../components';

const StoreCardsCollection : React.FC<any> = ({selectedCard, setSelectedCard}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;
	const [options, setOptions] = useState(null);
	const [activeSeries, setActiveSeries] = useState<any>(cards.get(chainId).find(series => {
																if (chainId === 56) {
																	return series.title_formatted === 'CARTOONIZED_SERIES'
																}
																return series.title_formatted === 'EVENT_ITEM_CARDS'
															}));

	useEffect(() => {
		setActiveSeries( cards.get(chainId).find(series => {
			if (chainId === 56) {
				return series.title_formatted === 'CARTOONIZED_SERIES'
			}
			return series.title_formatted === 'EVENT_ITEM_CARDS'
		}))
	},[setActiveSeries, chainId])

	useEffect(() => {
		setSelectedCard(null);
	},[setSelectedCard, chainId])

	useEffect(() => {
		setOptions( cards.get(chainId).map((series, key) => {
			return {
				title: series.title,
				onClick: () => setActiveSeries(series)
			}
		}))
	}, [setActiveSeries, chainId]);

	return (
		<div>
			<StoreSelectionWrapper>
				{/*<Button styling="link" style={{padding: 0}} onClick={selectAllSeries}>show series</Button>*/}
				{(activeSeries && options) && <DropdownMenu title="0 Selected" options={options} activeOptions={activeSeries} setActiveSeries={setActiveSeries}/>}
			</StoreSelectionWrapper>
			{/*{seriesToMap.map((activeSerie, key) => {
				return (
					<div key={key}>*/}
					{ activeSeries &&
						<StyledStoreCardsWrapper>
							<Title as="h3" size='m' font={theme.font.spaceMace}>{activeSeries.title}</Title>
							<Spacer size="md"/>
							<StyledStoreCardsInner gridCols={selectedCard ? 3 : 5}>
								{activeSeries.cards.map(cardId => {
									return <CardSingle key={cardId} cardId={cardId} selectedCard={selectedCard} selectCard={setSelectedCard}/>
								})}
							</StyledStoreCardsInner>
							<Spacer size="md"/>
						</StyledStoreCardsWrapper>
					}
				{/*)
			})}*/}
		</div>
	)
}

export default StoreCardsCollection;
