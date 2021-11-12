import {useCallback, useState} from 'react'
import {redeemCard, redeemCardNative} from '../pepemon/utils'
import usePepemon from './usePepemon';

const useRedeemCard = (storeContract: any) => {
	const [isRedeeming, setIsRedeeming] = useState<Array<string | boolean> | number>([])
    const pepemon = usePepemon();

    const handleRedeem = useCallback(async (tokenId, amount = null) => {
        try {
            setIsRedeeming([tokenId, true]);
            if (amount) {
                await redeemCardNative(pepemon.provider, storeContract, tokenId, amount)
            } else {
                await redeemCard(pepemon.provider, storeContract, tokenId)
            }

            setIsRedeeming([tokenId, false]);
        } catch (error) {
            console.log(error);
            setIsRedeeming([tokenId, false]);
        }
    }, [pepemon, storeContract])

	return {
        onRedeemCard: (tokenId: number, amount?: string) => handleRedeem(tokenId, amount),
        isRedeemingCard: isRedeeming[1] ? isRedeeming : false,
    }
};

export default useRedeemCard;
