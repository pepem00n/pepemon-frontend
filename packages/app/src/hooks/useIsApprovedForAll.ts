import { useCallback, useEffect, useState } from 'react';
import usePepemon from './usePepemon';
import { getIsApprovedForAll, getPepemonFactoryContract, getPepemonStakeAddress } from '../pepemon/utils';
import { correctChainIsLoaded } from '../utils/network';

const useIsApprovedForAll = () => {
    const [isApprovedForAll, setIsApprovedForAll] = useState(false)
    const { account }: { account: string } = usePepemon()
    const pepemon = usePepemon()
    const factoryContract = getPepemonFactoryContract(pepemon)

    const fetchIsApprovedForAll = useCallback(async () => {
        const isApproved = await getIsApprovedForAll( factoryContract, getPepemonStakeAddress(pepemon), account )
        setIsApprovedForAll(isApproved)
    }, [account, factoryContract, pepemon])

    useEffect(() => {
        correctChainIsLoaded(pepemon).then(correct => {
            if (account && factoryContract && correct) {
                fetchIsApprovedForAll()
            }
        })
    }, [pepemon, account, factoryContract, fetchIsApprovedForAll])

    return isApprovedForAll;
}

export default useIsApprovedForAll;
