import {useCallback, useContext, useState} from 'react';
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {Contracts} from '../pepemon/lib/contracts';
import {PepemonProviderContext} from '../contexts';

// Enter a valid infura key here to avoid being rate limited
// You can get a key for free at https://infura.io/register
const INFURA_ID = "7a9c4ff3188d481f9143904079638424";

const NETWORK_NAME = "mainnet";

function useWeb3Modal(config = {}) {
    const [provider, setProvider] = useState(null);
    // const [autoLoaded, setAutoLoaded] = useState(false);
    const [, dispatch] = useContext(PepemonProviderContext);
    const { infuraId = INFURA_ID, NETWORK = NETWORK_NAME }: any = config;

    // Web3Modal also supports many other wallets.
    // You can see other options at https://github.com/Web3Modal/web3modal
    const web3Modal = new Web3Modal({
        network: NETWORK,
        cacheProvider: false,
        providerOptions: {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId,
                },
            },
        },
        theme: "light",
    });

    // Open wallet selection modal.
    const loadWeb3Modal = useCallback(async () => {
		const setPepemon = async (newProvider: any, newChainId: any = null) => {
			if (!newProvider) {
				return;
			}

			const { chainId } = await newProvider.getNetwork();
			const accounts = await newProvider.listAccounts();
			const contracts = new Contracts(newProvider, newChainId ? parseInt(newChainId, 16) : chainId)

			return await dispatch({
				type: 'all',
				contracts,
				chainId: newChainId ? parseInt(newChainId, 16) : chainId,
				// account: newProvider.provider.selectedAddress ? newProvider.provider.selectedAddress : newProvider.provider.accounts[0],
				account: accounts[0],
				provider: newProvider,
			})
		};

		const subscribeProvider = async (provider: any) => {
			if (!provider.on) {
				return;
			}
			provider.on("chainChanged", async (chainId: string) => {
				console.info('[PROVIDER] chain changed to ', chainId);

				const web3Provider = new Web3Provider(provider, "any");
				setPepemon(web3Provider, chainId).then(() => console.log('Contracts LOADED'));
			});

			provider.on("accountsChanged", async (account: string) => {
				console.info('[PROVIDER] account changed to ', account);

				const web3Provider = new Web3Provider(provider, "any");
				setPepemon(web3Provider).then(() => console.log('Contracts LOADED'));
			});
		};

        const newProvider = await web3Modal.connect();
        await subscribeProvider(newProvider);

        const web3Provider = new Web3Provider(newProvider, "any");
        setProvider(web3Provider);
        setPepemon(web3Provider).then(() => console.log('Contracts LOADED'));
    }, [web3Modal, dispatch]);

    const logoutOfWeb3Modal = useCallback(

        async function () {
			const resetApp = async () => {
				if (typeof provider.close === 'function') {
					provider && await provider.close();
				}

				setProvider(null);

				await web3Modal.clearCachedProvider();
				await dispatch({
					type: 'reset',
				})
			}

			await resetApp();
        },[dispatch, provider, web3Modal]
    );

    // If autoLoad is enabled and the the wallet had been loaded before, load it automatically now.
    // useEffect(() => {
    //     if (autoLoad && !autoLoaded && web3Modal.cachedProvider) {
    //         loadWeb3Modal();
    //         setAutoLoaded(true);
    //     }
    // }, [autoLoad, autoLoaded, loadWeb3Modal, setAutoLoaded, web3Modal.cachedProvider]);

    return [provider, loadWeb3Modal, logoutOfWeb3Modal];
}

export default useWeb3Modal;
