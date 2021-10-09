import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import PepemonProvider from "./contexts/PepemonProvider";
import ModalsProvider from "./contexts/Modals";
import { Page, TopBar } from "./components";
import { LoadingPage } from "./views";
// lazy import
const Home = lazy(() =>  import("./views/Home").then((module) => ({ default: module.Home })));
const Staking = lazy(() =>  import("./views/Staking").then((module) => ({ default: module.Staking })));
const Subscription = lazy(() =>  import("./views/Subscription").then((module) => ({ default: module.Subscription })));
const Store = lazy(() =>  import("./views/Store").then((module) => ({ default: module.Store })));

const App: React.FC = () => {
	const [ethChainId, setEthChainId] = useState(
		parseInt((window as any).ethereum && (window as any).ethereum.chainId) || 1
	); // ETH default
	const [providerChainId, setProviderChainId] = useState(
		parseInt((window as any).ethereum && (window as any).ethereum.chainId) || 1
	);

	useEffect(() => {
		// @ts-ignore
		window.ethereum && window.ethereum.on("chainChanged", (chainId: string) => {
			setProviderChainId(parseInt(chainId));
		});
	}, []);

	const pepemonState = {
		appChainId: ethChainId,
		providerChainId: providerChainId,
		setChainId: setEthChainId,
	}

	return (
		<Providers ethChainId={ethChainId}>
			<TopBar
				staking={true}
				ethChainId={ethChainId}
				setEthChainId={setEthChainId}
			/>
			<Router>
				<Page>
					<Suspense fallback={<LoadingPage/>}>
						<Switch>
							<Route path="/staking" exact>
								<Staking {...pepemonState}/>
							</Route>
							<Route path="/subscription" exact>
								<Subscription {...pepemonState} />
							</Route>
							<Route path="/store/:storeState?">
								<Store {...pepemonState} />
							</Route>
							<Route path="/">
								<Home {...pepemonState}/>
							</Route>
						</Switch>
					</Suspense>
				</Page>
			</Router>
		</Providers>
	);
};

export default App;

const Providers: React.FC<any> = ({ ethChainId, children }) => {
	// const getConnectorRpcUrl = () => {
	// switch (ethChainId) {
	// 	case 1:
	// 	return "https://mainnet.eth.aragon.network/"; // MAIN
	// 	case 4:
	// 	return "https://api.infura.io/v1/jsonrpc/rinkeby"; // RINKEBY
	// 	case 56:
	// 	return "https://bsc-dataseed.binance.org/"; // BSC
	// 	case 137:
	// 	return "https://rpc-mainnet.matic.network";
	// 	//'https://rpc-mainnet.maticvigil.com/v1/7bb3aa1bee5774caa7c9eab73c97fa27ca388d95' // MATIC
	// }
	// };

	return (
		<ThemeProvider theme={theme}>
			<PepemonProvider>
			<ModalsProvider>{children}</ModalsProvider>
			</PepemonProvider>
			{/*</UseWalletProvider>*/}
		</ThemeProvider>
	);
};
