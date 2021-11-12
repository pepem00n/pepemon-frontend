import React from 'react';
import { DefaultPage } from '../../components';
import StakeCard from './components/StakeCard';

export const stakingMeta = {
	title: 'Pepemon - Staking',
	description: 'Users have the choice of staking PPBLZ on our platform for basic APY, or stake PPBLZ-ETH LP tokens for double the rewards in PPDEX. Collect fees and help other Pepetrainers trade by staking LP tokens.'
}

const Staking: React.FC<any> = () => {
	return (
		<DefaultPage title='Staking'>
			<StakeCard/>
		</DefaultPage>
	)
}

export default Staking;
