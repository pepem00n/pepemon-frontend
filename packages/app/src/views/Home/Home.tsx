import React from 'react';
import styled from 'styled-components/macro';
import { isMobile } from 'web3modal';
// import { useTranslation } from 'react-i18next';
import { AnimatedImg, ContentBox, ContentBoxNumber, ContentBoxGrid, ContentCentered, ContentColumn, ContentColumns, ExternalLink, Evolve, Spacer, ButtonLink, Title, Text, SocialBoxes, Newsletter } from "../../components";
import Balances from './components/Balances';
import { theme } from "../../theme";
import { useTokenPrices } from "../../hooks";
import { calculatePpblzApy } from "../../utils";
import { dummyGraph, group, cover, coverblack, fudizardPng, logoexpand, pepechu_res, cardsStack } from "../../assets";

const Home: React.FC<any> = () => {
	const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);
	// const { t, i18n } = useTranslation();

	return (
		<HomeWrapper>
			<StyledSection bgImage={cover} style={{paddingTop: "12.125em"}}>
				<ContentColumns>
					<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
						<Title as="h1" font={theme.font.spaceMace} size='xxxl'>Gotta claim ‘em all!</Title>
						<Text as="p" font={theme.font.inter} size={1.375}>
							Digital collectible card games on blockchain owned by the players. 100% airdropped. Play2Earn games powered by DeFi and NFTs in-game assets.
						</Text>
						<Spacer size="lg"/>
						<Spacer size="lg"/>
						<ContentColumns width='250%'>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
								<ContentBox shadow>
									<ContentBoxNumber><span>1</span></ContentBoxNumber>
									<Text as="p" align="center">
										Start your journey by getting $PPBLZ
									</Text>
									<Spacer size="md"/>
									<ExternalLink href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8" styling='button'>
										Become the very best
									</ExternalLink>
								</ContentBox>
							</ContentColumn>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(30%)"}}>
								<ContentBox shadow>
									<ContentBoxNumber><span>2</span></ContentBoxNumber>
									<Text as="p" align="center">
										Stake your $PPBLZ with
									</Text>
									<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">
										{ppblzApy.toFixed(0)}% APY
									</Text>
									<Spacer size="md"/>
									<ButtonLink light="true" to="/staking">Start staking</ButtonLink>
								</ContentBox>
							</ContentColumn>
							<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(60%)"}}>
								<ContentBox shadow>
									<ContentBoxNumber><span>3</span></ContentBoxNumber>
									<Text as="p" align="center">
										Buy or earn $PPDEX and get NFT Boosterpacks!
									</Text>
									<Spacer size="md"/>
									<ButtonLink light="true" to="/store/boosterpacks">Get your Boosterpacks</ButtonLink>
								</ContentBox>
							</ContentColumn>
						</ContentColumns>
					</ContentColumn>
					<ContentColumn width="60%">
						<img src={group} alt="Pepetrainers" style={{maxWidth: "120%", width: "750px"}}/>
					</ContentColumn>
				</ContentColumns>
				<ContentColumns style={{marginTop: "23em", marginBottom: "7.5em"}}>
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

			<StyledSection bgImage={coverblack}>
				<ContentCentered style={{paddingTop: "7.5em"}}>
					<Title as="h1" font={theme.font.neometric} size='xxl' color={theme.color.white} weight={900} align="center" lineHeight={1.04}>
						Start earning<br /> before ETH 2.0.
					</Title>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.spaceMace} color={theme.color.white} align="center" underline>NO VCs. No pre-sale.</Text>
					<Spacer size="md"/>
					<Text as="p" font={theme.font.inter} color={theme.color.white} align="center">
					Pepemon tokens were 100% airdropped. No VCs and no presale was held, just 300 people getting PPBLZ airdropped to their wallet.
					Since then on average more than 80% of those tokens were staked to generate PPDEX and mint NFT Cards.
					</Text>
					<Spacer size="md"/>

					<Balances />

					<ContentColumns style={{marginTop: "10em", marginBottom: "7.5em"}}>
						<ContentColumn width="40%" style={{paddingTop: "7em"}}>
							<Title as="h2" font={theme.font.neometric} size='xxl' weight={900} lineHeight={1.04}>Get yours before it's too late!</Title>
							<Spacer size="md"/>
							<ContentColumns justify="space-between">
								<ContentColumn>
									<Text as="p" font={theme.font.spaceMace} underline>Golden Fudizard</Text>
								</ContentColumn>
								<ContentColumn>
									<ContentBoxGrid gridTemplate='"meta1 meta2 meta3"'>
										<div style={{ gridArea: "meta1" }}>
											<Text as="p" align="center">owners</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">28</Text>
										</div>
										<div style={{ gridArea: "meta2" }}>
											<Text as="p" align="center">total</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">30</Text>
										</div>
										<div style={{ gridArea: "meta3" }}>
											<Text as="p" align="center">last sold</Text>
											<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">2.8ETH</Text>
										</div>
									</ContentBoxGrid>
								</ContentColumn>
							</ContentColumns>
							<img loading="lazy" src={dummyGraph} alt="graph"/>
							<ExternalLink styling="button" style={{display: "inline-block", width: "100%"}} href="https://opensea.io/collection/pepemonfactory">
								Buy now
							</ExternalLink>
						</ContentColumn>
						<ContentColumn width="60%">
							<div style={{ position: "relative", height: "100%", width: "100%" }}>
								<ContentCentered>
									<img loading="lazy" src={fudizardPng} alt="fudizard"/>
								</ContentCentered>
							</div>
						</ContentColumn>
					</ContentColumns>
				</ContentCentered>
			</StyledSection>

			<StyledSection>
				<ContentColumns>
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
					<ContentColumn width="45%">
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

const HomeWrapper = styled.div`
	padding-bottom: ${2 * theme.footer.height}px;
	width: 100vw;

	@media (min-width: ${theme.breakpoints.desktop}) {
		margin-left: ${theme.sideBar.width.closed}px;
		width: calc(100vw - ${theme.sideBar.width.closed}px);
	}
`

const StyledSection = styled.section<{bgImage?: string, bgColor?: string}>`
	background-position: center;
	background-image: ${props => props.bgImage && `url(${props.bgImage})`};
	background-color: ${props => props.bgColor && props.bgColor};
	background-size: 100% auto;
	background-repeat: no-repeat;
	background-position-y: 0;
	padding-left: 2em;
	padding-right: 2em;
`

export default Home;
