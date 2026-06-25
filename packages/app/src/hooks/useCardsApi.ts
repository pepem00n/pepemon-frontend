import {useEffect, useState} from 'react';
import usePepemon from './usePepemon';

export interface CardTrait {
	trait_type: string,
	value: string,
}
export interface CardMetadata {
	tokenId: number,
	pool: any,
	external_url: string,
	image: string,
	name: string,
	description: string,
	attributes: CardTrait[],
}

export const useCardsMetadata = (tokenIds: number[]) => {
	const [cards, setCards] = useState<any[]>([]);
	const apiUri = new Map([
		[1, `/metadata/cards/`],
		[4, `/metadata/cards/`],
		[56, `/metadata/cards/bsc/`],
		[137, `/metadata/cards/matic/`],
	])
	const pepemon = usePepemon();

	useEffect(() => {
		const fetchCardInfo = async (tokenId: number) => {
			const chainId = pepemon?.chainId || 1;
			const response = await fetch(
				`${apiUri.get(chainId)}${tokenId}`,
				{ method: 'GET'},
			)
			if (!response.ok) {
				return {tokenId, status: 'failed'};
			}
			const data = await response.json();
			if (data.image) data.image = data.image.replace('https://pepemon.world/', '/');
			return {tokenId, ...data};
		}

		Promise.all(tokenIds.map((tokenId) => fetchCardInfo(tokenId)))
			.then((responses) => {
				// @ts-ignore
				setCards(responses.filter(response => {
					return response !== undefined
				}));
			})
	}, [tokenIds, pepemon.chainId])

	return cards;
}

export const getCardMeta = async (tokenId: number, pepemon: any) => {
	const apiUri = new Map([
		[1, `/metadata/cards/`],
		[4, `/metadata/cards/`],
		[56, `/metadata/cards/bsc/`],
		[137, `/metadata/cards/matic/`],
	])

	const fetchCardInfo = async (tokenId: number) => {
		const chainId = pepemon?.chainId || 1;
		const response = await fetch(
			`${apiUri.get(chainId)}${tokenId}`,
			{ method: 'GET'},
		)
		if (!response.ok) {
			return {tokenId, status: 'failed'};
		}
		const data = await response.json();
		if (data.image) data.image = data.image.replace('https://pepemon.world/', '/');
		return {tokenId, ...data};
	}

	return await fetchCardInfo(tokenId);


	// Promise.all(tokenIds.map((tokenId) => fetchCardInfo(tokenId)))
	//     .then((responses) => {
	//         // @ts-ignore
	//         setCards(responses.filter(response => {
	//             return response !== undefined
	//         }));
	//     })
}

export default useCardsMetadata;
