import React from 'react';
import styled from 'styled-components/macro';
import { isMobile } from 'web3modal';
// import { useTranslation } from 'react-i18next';
import { AnimatedImg, ContentCentered, ContentColumn, ContentColumns, Evolve, Hero, Stats, Spacer, ButtonLink, Title, Text, SocialBoxes, Newsletter } from '../../components';
import Balances from './components/Balances';
import { theme } from '../../theme';
import { useTokenPrices } from '../../hooks';
import { calculatePpblzApy } from '../../utils';
import { cover, coverblack, logoexpand, pepechu_res, cardsStack } from '../../assets';

const Home: React.FC<any> = () => {
	const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
	// const { t, i18n } = useTranslation();

	return (
		<HomeWrapper bgImage={cover}>
			<StyledSection
				desktopStyle={{paddingTop: "12.125em"}}
				mobileStyle={{paddingTop: '3em', backgroundColor: theme.color.purple[200]}}>
				<Hero apy={`${ppblzApy.toFixed(0)}% APY`}/>
			</StyledSection>

			<StyledSection desktopStyle={{marginTop: "17em", marginBottom: "7.5em"}}>
				<ContentColumns>
					{ !isMobile() &&
						<ContentColumn width="40%">
							<img loading="lazy" src={cardsStack} alt='awesome cards' style={{ objectFit: "cover"}}/>
						</ContentColumn>
					}
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900} lineHeight={1.15}>Collect unique Pepemon NFT cards</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Scarcity meets pixel perfect art</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Use PPDEX to mint unique Pepemon NFT cards. All the cards are created by upcoming artists all over the world.
							<br/><br/>
							Once you have minted your cards, you can become the very best by dueling with your NFTs in a Trading Card Game on blockchain!
							<br/><br/>
							"Pepechu, I choose you!"
						</Text>
						<Spacer size="md"/>
						{ isMobile() &&
							<>
								<img loading="lazy" src={pepechu_res} alt='pepechu'style={{ objectFit: "cover"}}/>
								<Spacer size="md"/>
							</>
						}
						<ButtonLink to="/store/cards">Mint your card</ButtonLink>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection bgImage={coverblack} desktopStyle={{ color: theme.color.white, textAlign: 'center' }}>
				<ContentCentered style={{paddingTop: "7.5em"}}>
					<Title as="h1" font={theme.font.neometric} size='xxl' color='inherit' weight={900} lineHeight={1.04}>
						Start earning<br /> before ETH 2.0.
					</Title>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.spaceMace} align='left' color='inherit' underline>NO VCs. No pre-sale.</Text>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.inter} color='inherit'>
					Pepemon tokens were 100% airdropped. No VCs and no presale was held, just 300 people getting PPBLZ airdropped to their wallet.
					Since then on average more than 80% of those tokens were staked to generate PPDEX and mint NFT Cards.
					</Text>
					<Spacer size="md"/>

					<Balances />

					<Stats/>
				</ContentCentered>
			</StyledSection>

			<StyledSection>
				<ContentColumns mobileStyle={{ flexDirection: 'column-reverse' }}>
					<ContentColumn width="40%">
						<Evolve/>
					</ContentColumn>
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900}>Stake to evolve</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Staking events</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Evolve your awesome Pepemon cards to mint exclusive cards and crush your enemies in blockchain battles.
						</Text>
						<Text as="p" font={theme.font.inter}>
							Don't forget to use special NFT Event items to save your monsters when evolving!
						</Text>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection>
				<ContentColumns style={{marginBottom: "7.5em"}}>
					<ContentColumn width="55%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900}>Pepemon: Degen Battleground</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Beta release late 2021</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Duel other trainers on an epic game powered by DeFi and NFT's. Become a professional Pepetrainer with the Play2Earn mechanism that enables each player to get exclusive drops after a battle no matter what the skill level or collection size, there is always an opportunity to earn!
						</Text>
					</ContentColumn>
					<ContentColumn mobileStyle={{ marginTop: '2em' }} width="45%">
						<div style={{ position: "relative", height: "100%", width: "100%" }}>
							<AnimatedImg src={logoexpand} alt="Pepemon"/>
						</div>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection bgColor={theme.color.purple[300]}>
				<Newsletter/>
			</StyledSection>

			<StyledSection bgColor={theme.color.purple[200]}>
				<SocialBoxes/>
			</StyledSection>
		</HomeWrapper>
	)
}

const HomeWrapper = styled.div<{bgImage?: string}>`
	padding-bottom: ${2 * theme.footer.height}px;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		${ props => props.bgImage && `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}
`

interface StyledSectionProps {
	bgImage?: string,
	bgColor?: string,
	desktopStyle?: object,
	mobileStyle?: object,
}

const StyledSection = styled.section<any>`
	background-color: ${props => props.bgColor && props.bgColor};
	padding-left: 2em;
	padding-right: 2em;

	@media (max-width: ${theme.breakpoints.desktop}) {
		${props => props.mobileStyle && props.mobileStyle}
	}

	@media (min-width: ${theme.breakpoints.desktop}) {
		${ props => props.bgImage && `
			background-image: url(${props.bgImage});
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position-x: center;
			background-position-y: 0;
		`}
		${props => props.desktopStyle && props.desktopStyle}
	}
`

export default Home;
