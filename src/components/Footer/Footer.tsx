import styled from "styled-components";
import { footercover, logoexpand } from "../../assets";
import { theme } from "../../theme";
import { Title } from "../../components";

const Footer = () => {
	return (
		<StyledFooter>
			<div style={{ height: "450px" }}/>
			<StyledFooterInner>

				<StyledFooterGrid>
					<div>
						<img loading="lazy" src={logoexpand} alt="pepemon logo" style={{maxWidth: "10em"}}/>
					</div>
					<div>
						<Title as="h2" size={.8} weight={400} color={theme.color.white}>PEPEMON</Title>
						<StyledList>
							<li><StyledLink href="/about">About</StyledLink></li>
							<li><StyledLink href="/whitepaper">Whitepaper</StyledLink></li>
							<li><StyledLink href="/game">Pepemon the game</StyledLink></li>
						</StyledList>
					</div>
					<div>
						<Title as="h2" size={.8} weight={400} color={theme.color.white}>TOKENS</Title>
						<StyledList>
							<li><ExternalStyledLink href="https://etherscan.io/token/0x4d2ee5dae46c86da2ff521f7657dad98834f97b8">PPBLZ Contract</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://etherscan.io/token/0xf1f508c7c9f0d1b15a76fba564eef2d956220cf7">PPDEX Contract</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8">Buy $PPBLZ</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://app.uniswap.org/#/swap?outputCurrency=0xf1f508c7c9f0d1b15a76fba564eef2d956220cf7">Buy $PPDEX</ExternalStyledLink></li>
						</StyledList>
					</div>

					<div>
						<Title as="h2" size={.8} weight={400} color={theme.color.white}>SOCIALS</Title>
						<StyledList>
							<li><ExternalStyledLink href="https://twitter.com/pepemonfinance">Twitter</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://t.me/pepemonfinance">Telegram</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://discord.gg/R8sZwMv">Discord</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://github.com/pepem00n">Github</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://medium.com/@pepemonfinance">Medium</ExternalStyledLink></li>
							<li><ExternalStyledLink href="https://opensea.io/collection/pepemonfactory">OpenSea</ExternalStyledLink></li>
						</StyledList>
					</div>
				</StyledFooterGrid>
				<StyledFooterLegal>
					<hr/>
					<StyledFooterLegalInner>
						<StyledFooterLegalLinks>
							<a href="https://example.com">Terms of service</a>
							<a href="https://example.com">Privacy policy</a>
							<a href="https://example.com">Cookie policy</a>
						</StyledFooterLegalLinks>
						<div>
							© 2021
						</div>
					</StyledFooterLegalInner>
				</StyledFooterLegal>
			</StyledFooterInner>
		</StyledFooter>
	)
}

const StyledFooter = styled.footer`
	background-position-x: center;
	background-position-y: 100%;
	background-image: url(${footercover});
	background-size: 100% auto;
	background-repeat: no-repeat;
`

const StyledFooterInner = styled.div`
	margin-left: auto;
	margin-right: auto;
	max-width: ${theme.page.maxWidth}px;
`

const StyledFooterGrid = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-template-columns: repeat(4, 1fr);
	padding-bottom: 2em;
`

const StyledList = styled.ul`
	list-style-type: none;
	padding-left: 0;
`

const footerLinks = `
	color: ${theme.color.white};
	font-size: .875rem;
	line-height: 1.6;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`

const StyledLink = styled.a`${footerLinks}`

const ExternalStyledLink = styled.a.attrs({
	target: "_blank",
	rel: "noopener noreferrer",
})`${footerLinks}`;

const StyledFooterLegal = styled.div`
	color: ${theme.color.white};
	font-size: .875rem;
	opacity: .6;
`

const StyledFooterLegalInner = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	padding-bottom: 1.5em;
	padding-top: 1.5em;
`

const StyledFooterLegalLinks = styled.div`
	display: flex;

	a {
		color: currentColor;
		text-decoration: none;

		&:not(:first-child) {
			margin-left: 1.5em;
		}
	}
`

export default Footer;
