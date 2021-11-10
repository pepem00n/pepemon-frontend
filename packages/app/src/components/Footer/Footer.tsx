import React from 'react';
import styled from 'styled-components/macro';
import { footercover, logoexpand } from '../../assets';
import { theme } from '../../theme';
import { Title } from '../../components';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterImg src={footercover}/>
			<StyledFooterInnerWrapper>
				<StyledFooterInner>
					<StyledFooterGrid>
						<div>
							<img loading='lazy' src={logoexpand} alt='pepemon logo' style={{maxWidth: '10em'}}/>
						</div>
						<div>
							<Title as='h2' size='xxxs' weight={400} color={theme.color.white}>Start researching</Title>
							<StyledList>
								<li><StyledLink external href='https://docs.pepemon.world/'>Docs</StyledLink></li>
								<li><StyledLink external href='https://opensea.io/collection/pepemonfactory'>Opensea</StyledLink></li>
								<li><StyledLink external href='https://docs.pepemon.world/gaming'>Degen Battleground</StyledLink></li>
							</StyledList>
						</div>
						<div>
							<Title as='h2' size='xxxs' weight={400} color={theme.color.white}>Start earning</Title>
							<StyledList>
								<li><StyledLink external href='https://etherscan.io/token/0x4d2ee5dae46c86da2ff521f7657dad98834f97b8'>PPBLZ Contract</StyledLink></li>
								<li><StyledLink external href='https://etherscan.io/token/0xf1f508c7c9f0d1b15a76fba564eef2d956220cf7'>PPDEX Contract</StyledLink></li>
								<li><StyledLink external href='https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8'>Buy $PPBLZ</StyledLink></li>
								<li><StyledLink external href='https://app.uniswap.org/#/swap?outputCurrency=0xf1f508c7c9f0d1b15a76fba564eef2d956220cf7'>Buy $PPDEX</StyledLink></li>
							</StyledList>
						</div>

						<div>
							<Title as='h2' size='xxxs' weight={400} color={theme.color.white}>Get in touch</Title>
							<StyledList>
								<li><StyledLink external href='https://twitter.com/pepemonfinance'>Twitter</StyledLink></li>
								<li><StyledLink external href='https://t.me/pepemonfinance'>Telegram</StyledLink></li>
								<li><StyledLink external href='https://discord.gg/R8sZwMv'>Discord</StyledLink></li>
								<li><StyledLink external href='https://github.com/pepem00n'>Github</StyledLink></li>
								<li><StyledLink external href='https://medium.com/@pepemonfinance'>Medium</StyledLink></li>
							</StyledList>
						</div>
					</StyledFooterGrid>
					<StyledFooterLegal>
						<hr/>
						<StyledFooterLegalInner>
							<StyledFooterLegalLinks>
								<Link to='/terms-of-service'>Terms of service</Link>
								<Link to='/privacy-policy'>Privacy policy</Link>
							</StyledFooterLegalLinks>
							<div>
								© 2021
							</div>
						</StyledFooterLegalInner>
					</StyledFooterLegal>
				</StyledFooterInner>
			</StyledFooterInnerWrapper>
		</StyledFooter>
	)
}

const StyledFooter = styled.footer`
	bottom: 0;
	position: relative;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}
`

const StyledFooterImg = styled.img`
	bottom: 100%;
	display: block;
	position: absolute;
	width: 100%;
`

const StyledFooterInnerWrapper = styled.div`
	background-color: ${theme.color.purple[800]};
`

const StyledFooterInner = styled.div`
	margin-left: auto;
	margin-right: auto;
	max-width: ${theme.page.maxWidth}px;
	padding-left: clamp(1em, 2.65vw, 2em);
	padding-right: clamp(1em, 2.65vw, 2em);
`

const StyledFooterGrid = styled.div`
	display: grid;
	grid-gap: 1.5em;
	grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
	padding-bottom: 2em;
	padding-top: 2em;
`

const StyledList = styled.ul`
	list-style-type: none;
	padding-left: 0;
`

interface StyledLinkProps {
  external?: boolean;
}

const StyledLink = styled.a.attrs<StyledLinkProps>(props => props.external && {
	target: '_blank',
	rel: 'noopener noreferrer',
})<StyledLinkProps>`
	color: ${theme.color.white};
	font-size: .875rem;
	line-height: 1.6;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

const StyledFooterLegal = styled.div`
	color: ${theme.color.white};
	font-size: .875rem;
	opacity: .6;
`

const StyledFooterLegalInner = styled.div`
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding-bottom: 1.5em;

	div {
		margin-top: 1.5em;
	}
`

const StyledFooterLegalLinks = styled.div`
	display: flex;

	a {
		color: currentColor;
		margin-right: 1.5em;
		text-decoration: none;
	}
`

export default Footer;
