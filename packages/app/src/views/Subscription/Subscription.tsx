import React from 'react'
import { DefaultPage } from '../../components';
import SubscriptionCard from './components/SubscriptionCard';

export const subscriptionMeta = {
	title:'Pepemon - Subscription',
	description: "The Pepemon One NFT subscription is the best way to not miss out on any new exclusive collector's edition NFT and ensure yourself of a steady NFT drop every month and more!"
}

const Subscription: React.FC<any> = () => {
	return (
		<DefaultPage title='Subscription'>
			<SubscriptionCard/>
		</DefaultPage>
	)
}

export default Subscription;
