import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Page, TopBar } from './components'
import { ModalsProvider, PepemonProvider } from './contexts';
import { withConnectedWallet } from './hocs'
import { theme } from './theme'
import { LoadingPage } from './views';
const Home = lazy(() =>  import("./views/Home").then((module) => ({ default: module.default })));
const Staking = lazy(() =>  import("./views/Staking").then((module) => ({ default: module.default })));
const Subscription = lazy(() =>  import("./views/Subscription").then((module) => ({ default: module.default })));
const Store = lazy(() =>  import("./views/Store").then((module) => ({ default: module.default })));
const TermsOfService = lazy(() =>  import("./views/TermsOfService").then((module) => ({ default: module.default })));
const PrivacyPolicy = lazy(() =>  import("./views/PrivacyPolicy").then((module) => ({ default: module.default })));
const Error404 = lazy(() =>  import("./views/Error404").then((module) => ({ default: module.default })));

const StakingWithAuth = withConnectedWallet(Staking);
const SubscriptionWithAuth = withConnectedWallet(Subscription);
const StoreWithAuth = withConnectedWallet(Store);

const App: React.FC = () => {
	return (
		<Providers>
			<Router>
				<TopBar/>
				<Page>
					<Suspense fallback={<LoadingPage/>}>
						<Switch>
							<Route path="/" exact>
								<Home/>
							</Route>
							<Route path="/staking">
								<StakingWithAuth/>
							</Route>
							<Route path="/subscription">
								<SubscriptionWithAuth/>
							</Route>
							<Route path="/store/:storeState?">
								<StoreWithAuth/>
							</Route>
							<Route path='/terms-of-service' component={TermsOfService} />
							<Route path='/privacy-policy' component={PrivacyPolicy} />
							<Route component={Error404} />
						</Switch>
					</Suspense>
				</Page>
			</Router>
		</Providers>
	)
}

const Providers: React.FC<any> = ({children}) => {
  // const getConnectorRpcUrl = () => {
  //   switch (ethChainId) {
  //     case 1: return 'https://mainnet.eth.aragon.network/' // MAIN
  //     case 4: return 'https://api.infura.io/v1/jsonrpc/rinkeby' // RINKEBY
  //     case 56: return 'https://bsc-dataseed.binance.org/' // BSC
  //     case 137: return 'https://rpc-mainnet.matic.network'
  //       //'https://rpc-mainnet.maticvigil.com/v1/7bb3aa1bee5774caa7c9eab73c97fa27ca388d95' // MATIC
  //   }
  // }

	return (
		<ThemeProvider theme={theme}>
			<ModalsProvider>
				<PepemonProvider>
					{children}
				</PepemonProvider>
			</ModalsProvider>
		</ThemeProvider>
	)
}

export default App
