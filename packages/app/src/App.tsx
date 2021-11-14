import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Page, TopBar, ScrollToTop } from './components';
import { ModalsProvider, PepemonProvider } from './contexts';
import { withConnectedWallet } from './hocs';
import { theme } from './theme';
import { metas, LoadingPage } from './views';
const Home = lazy(() =>  import("./views/Home").then((module) => ({ default: module.default })));
const Staking = lazy(() =>  import("./views/Staking").then((module) => ({ default: module.default })));
const Subscription = lazy(() =>  import("./views/Subscription").then((module) => ({ default: module.default })));
const Store = lazy(() =>  import("./views/Store").then((module) => ({ default: module.default })));
const TermsOfService = lazy(() =>  import("./views/TermsOfService").then((module) => ({ default: module.default })));
const PrivacyPolicy = lazy(() =>  import("./views/PrivacyPolicy").then((module) => ({ default: module.default })));
const Error404 = lazy(() =>  import("./views/Error404").then((module) => ({ default: module.default })));

const StakingWithAuth = withConnectedWallet(Staking, {metas: metas.stakingMeta});
const SubscriptionWithAuth = withConnectedWallet(Subscription, {metas: metas.subscriptionMeta});
const StoreWithAuth = withConnectedWallet(Store, {metas: metas.storeMeta});

const App: React.FC = () => {
	return (
		<Providers>
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
						<Route path={["/events", "/my-collection"]}>
							<Error404 title='This page will be available soon👀'/>
						</Route>
						<Route component={Error404} />
					</Switch>
				</Suspense>
			</Page>
			<ScrollToTop/>
		</Providers>
	)
}

const Providers: React.FC<any> = ({children}) => {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<PepemonProvider>
					<ModalsProvider>
						{children}
					</ModalsProvider>
				</PepemonProvider>
			</Router>
		</ThemeProvider>
	)
}

export default App
