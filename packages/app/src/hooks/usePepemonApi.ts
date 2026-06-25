import {useEffect, useState} from 'react';
import usePepemon from './usePepemon';

const usePepemonApi = (endpoint: string) => {
    const [response, setResponse] = useState<any>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const { chainId } = usePepemon();

    useEffect(() => {
		const fetchData = async (endpoint: string) => {
	        setIsFetching(true);
	        const effectiveChainId = chainId || 1;
	        const host = effectiveChainId === 1 ? `https://pepemon.world/api` : `https://dev.pepemon.finance/api`;
	        const response = await fetch(
	            `${host}${endpoint}`,
	            { method: 'GET'},
	        );
	        if (!response.ok) {
	            setIsFetching(false);
	            return null;
	        }
	        setIsFetching(false);
	        return response.json();
	    }

        fetchData(endpoint).then(res => setResponse(res)).catch(err => console.error(err));
    }, [chainId, endpoint])

    return { response, isFetching };
}

export default usePepemonApi;
