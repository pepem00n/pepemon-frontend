import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { useLocation } from 'react-router-dom';
import { Footer, Navigation, NotSupportedModal } from '../../components';
import { PepemonProviderContext } from '../../contexts';
import { darktealTiles } from '../../assets';
import { theme } from '../../theme';
import { isSupportedChain } from '../../utils';
// import Footer from '../Footer';

const Page: React.FC<any> = ({children}) => {
	const [pepemon] = useContext(PepemonProviderContext);
	const { chainId } = pepemon;

	const { pathname } = useLocation();

	// go to top
	window.scrollTo(0,0);

	return (
		<div style={{ position: 'relative' }}>
			<StyledPageWrapper>
				<Navigation/>
				{ (!isSupportedChain(chainId, pathname) && chainId) ? <NotSupportedModal page='Home'/>
				: children
				}
			</StyledPageWrapper>
			<Footer/>
		</div>
	)
}

export const StyledPageWrapper = styled.div`
	display: flex;
`

export const StyledPageWrapperMain = styled.main`
	background-attachment: fixed;
	background-image: url(${darktealTiles});
	background-repeat: no-repeat;
	background-size: cover;
	padding-left: clamp(1em, 2.65vw, 2em);
	padding-right: clamp(1em, 2.65vw, 2em);
	min-height: 100vh;
	padding-bottom: ${theme.footer.spaceTop}px;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: ${theme.breakpoints.ultra};
	margin-left: auto;
	margin-right: auto;
	padding-top: 6em;

	@media (min-width: ${theme.breakpoints.desktop}) {
		padding-top: 10em;
	}
`

export default Page
