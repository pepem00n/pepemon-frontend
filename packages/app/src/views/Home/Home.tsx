import React from 'react';
import styled from 'styled-components';
import { isMobile } from 'web3modal';
import {
  AnimatedImg,
  ContentCentered,
  ContentColumn,
  ContentColumns,
  Evolve,
  Head,
  Hero,
  Stats,
  Spacer,
  ButtonLink,
  Title,
  Text,
  SocialBoxes,
  Newsletter,
} from "../../components";
import Balances from './components/Balances';
import { theme } from '../../theme';
import { useTokenPrices } from '../../hooks';
import { calculatePpblzApy } from '../../utils';
import { cover, coverblack, logoexpand, pepechu_res, bluecard, pepechucard, pepechurcard, witchenerycard } from '../../assets';
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';

const Home: React.FC<any> = () => {
	const { ppblzPrice, ppdexPrice } = useTokenPrices();
    const ppblzApy = calculatePpblzApy(ppblzPrice, ppdexPrice);

	return (
		<HomeWrapper bgImage={cover}>
			<Head title='Pepemon! Play and earn web3 card game'
				description='Mint and evolve NFTs or Battle opponents on card games rewarding PPDEX. Govern and farm by hodling PPBLZ.'
				twitterTitle='Pepemon! Play and earn web3 card game'
				twitterDescription='Mint and evolve NFTs or Battle opponents on card games rewarding PPDEX. Govern and farm by hodling PPBLZ.'/>
			<StyledSection
				desktopStyle={{paddingTop: "12.125em"}}
				mobileStyle={{paddingTop: '3em', backgroundColor: theme.color.purple[200]}}>
				<Hero apy={`${ppblzApy.toFixed(0)}% APY`}/>
			</StyledSection>

			<StyledSection desktopStyle={{marginTop: "17em", marginBottom: "7.5em"}}>
				<ContentColumns>
					<ContentColumn width="40%" style={{paddingTop: "xxl"}}>
						<div style={{ position: "relative", height: "100%", width: "100%" }}>
							<LazyLoadImage src={witchenerycard} alt="witchenery" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "40%", top: "-10%", zIndex: 99 }}/>
							<LazyLoadImage src={pepechucard} alt="pepechu" style={{ objectFit: "cover", width: "80%", position: "absolute", right: "10%", top: "20%" }}/>
							<LazyLoadImage src={bluecard} alt="blue" style={{ objectFit: "cover", width: "63%", position: "absolute", left: "-20%", top: "70%" }}/>
							<LazyLoadImage src={pepechurcard} alt="pepechur" style={{ objectFit: "cover", width: "20%", position: "absolute", right: "28%", top: "-18%" }}/>
						</div>
					</ContentColumn>
					
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900} lineHeight={1.15}>Collect unique Pepemon NFT cards</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Pepemon NFTs: scarcity meets pixel perfect art</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Use PPDEX to mint unique Pepemon NFT cards. All the cards are created by upcoming artists all over the web3 & Metaverse.
							<br/><br/>
							Once you have minted your cards, you can evolve them to become the very best by dueling with your NFTs in a Trading Card Game on blockchain!
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
						<ButtonLink to="/store/cards">Mint your cards</ButtonLink>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>
			
			<LazyLoadComponent threshold={200}>
				<StyledSection bgImage={coverblack} desktopStyle={{ color: theme.color.white, textAlign: 'center' }}>
					<ContentCentered style={{paddingTop: "7.5em"}}>
						<Title as="h1" font={theme.font.neometric} size='xxl' color='inherit' weight={900} lineHeight={1.04}>
							Start earning<br /> before ETH 2.0.
						</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} align='left' color='inherit' underline>NO VCs. No pre-sale.</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter} color='inherit'>
							Pepemon tokens were 100% airdropped. No VCs and No token Sale was held, just 300 people got PPBLZ airdropped to their wallets. Since then on average more than 80% of those tokens were staked to generate PPDEX and mint NFT Cards.
						</Text>
						<Spacer size="md"/>

						<Balances />

						<Stats/>
					</ContentCentered>
				</StyledSection>
			</LazyLoadComponent>

			<StyledSection>
				<ContentColumns mobileStyle={{ flexDirection: 'column-reverse' }}>
					<ContentColumn width="40%">
						<Evolve/>
					</ContentColumn>
					<ContentColumn width="60%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size={'xxl'} weight={900}>Evolve your monsters and upgrade your cards</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Breed more Exclusive PepeMonsters!</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Evolve your awesome Pepemon cards and mint exclusive cards to crush your enemies on blockchain decided battles.
						</Text>
					</ContentColumn>
				</ContentColumns>
			</StyledSection>

			<StyledSection>
				<ContentColumns style={{marginBottom: "7.5em"}}>
					<ContentColumn width="55%" style={{paddingTop: "3.75em"}}>
						<Title as="h2" font={theme.font.neometric} size='xxl' weight={900}>Pepemon: Degen Battleground</Title>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.spaceMace} underline>Release coming in 2022</Text>
						<Spacer size="md"/>
						<Text as="p" font={theme.font.inter}>
							Duel other trainers on an epic game powered by DeFi and NFT's. Become a professional Pepetrainer with the PlayAndEarn mechanism that enables each player to get exclusive drops after a battle no matter what the skill level or collection size, there is always an opportunity to earn for everyone!
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

const HomeWrapper = styled.main<{bgImage?: string}>`
	padding-bottom: ${theme.footer.spaceTop}px;
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
	padding-left: clamp(1em, 2.65vw, 2em);
	padding-right: clamp(1em, 2.65vw, 2em);

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
