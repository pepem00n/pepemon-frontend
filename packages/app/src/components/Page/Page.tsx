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
	padding-bottom: 7.5em;
	padding-left: clamp(.8em, 2.65vw, 2em);
	padding-right: clamp(.8em, 2.65vw, 2em);
	min-height: 100vh;
	padding-bottom: ${2 * theme.footer.height}px;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${theme.sideBar.width}px;
		width: calc(100vw - ${theme.sideBar.width}px);
	}
`

export const StyledPageWrapperMainInner = styled.div`
	max-width: ${theme.breakpoints.ultra};
	margin-left: auto;
	margin-right: auto;
	padding-top: 10em;
`

export default Page
