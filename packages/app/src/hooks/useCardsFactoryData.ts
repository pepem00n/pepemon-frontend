import {useCallback, useEffect, useState} from 'react'
import {getBalanceOfBatch, getMaxSupply, getTotalSupply} from '../utils/erc1155';
import usePepemon from './usePepemon';
import {getPepemonFactoryContract} from '../pepemon/utils';
import {correctChainIsLoaded} from '../utils/network';

export interface CardBalances {
    tokenId: number,
    userBalance: string,
    maxSupply: string,
    totalSupply: string,
}

const setIntervalAsync = (fn: any, ms: any) => {
    fn().then(() => {
        setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
};

const useCardsFactoryData = (tokenIds: number[], transactions: number) => {
    const [cardsBalance, setCardsBalance] = useState([])
    const {
        account,
        provider,
        chainId,
    }: { account: string; provider: any, chainId: number } = usePepemon()
    const pepemon = usePepemon();


    const fetchCardBalances = useCallback(async (factoryContract) => {
        const batches = tokenIds.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 10)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        let runBatch = 0;
        let userBalances: any = []
        await new Promise<void>((resolve) => {
            setIntervalAsync(async () => {
                if (runBatch >= batches.length) {
                    return resolve()
                }

                const batchBalances = await getBalanceOfBatch(factoryContract, account, batches[runBatch]);
                userBalances = [...userBalances, ...batchBalances];

                runBatch += 1
            }, 100);
        });

        // const userBalances = await getBalanceOfBatch(factoryContract, account, tokenIds);
        return Promise.all(tokenIds.map(async (tokenId, index) => {
            return {
                tokenId,
                userBalance: userBalances && userBalances[index],
                maxSupply: await getMaxSupply(factoryContract, tokenId),
                totalSupply: await getTotalSupply(factoryContract, tokenId),
            }
        }))
    }, [tokenIds, account])

    useEffect(() => {
        if (provider && tokenIds.length) {
            correctChainIsLoaded(pepemon).then((correct) => {
                if (correct) {
                    const factoryContract = getPepemonFactoryContract(pepemon);
                    fetchCardBalances(factoryContract).then((balances) => setCardsBalance(balances))
                }
            })
        }
    }, [provider, pepemon, tokenIds, transactions, chainId, fetchCardBalances])

    return cardsBalance
}

export const getCardFactoryData = async (tokenId: number, pepemon: any, transactions: number) => {
    const { account }: { account: string; provider: any, chainId: number } = pepemon;

	const fetchCardBalances = async (factoryContract) => {
        const batches = [tokenId].reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / 10)

            if(!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(item)

            return resultArray
        }, [])

        let runBatch = 0;
        let userBalances: any = []
        await new Promise<void>((resolve) => {
            setIntervalAsync(async () => {
                if (runBatch >= batches.length) {
                    return resolve()
                }

                const batchBalances = await getBalanceOfBatch(factoryContract, account, batches[runBatch]);
                userBalances = [...userBalances, ...batchBalances];

                runBatch += 1
            }, 100);
        });

        // const userBalances = await getBalanceOfBatch(factoryContract, account, tokenIds);
        return Promise.all([tokenId].map(async (tokenId, index) => {
            return {
                tokenId,
                userBalance: userBalances && userBalances[index],
                maxSupply: await getMaxSupply(factoryContract, tokenId),
                totalSupply: await getTotalSupply(factoryContract, tokenId),
            }
        }))
    };

	const correct = await correctChainIsLoaded(pepemon);
    if (correct) {
        const factoryContract = getPepemonFactoryContract(pepemon);
        return await fetchCardBalances(factoryContract);
    }
    return [];
}

export default useCardsFactoryData
