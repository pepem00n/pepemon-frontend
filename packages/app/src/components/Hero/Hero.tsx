import React from 'react';
import { ContentBox, ContentBoxNumber, ContentColumn, ContentColumns, ExternalLink, Spacer, ButtonLink, Title, Text } from "../../components";
import { theme } from "../../theme";
import { group } from "../../assets";

const Hero: React.FC<any> = ({apy}) => {
	return (
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
								{apy && apy}
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
	)
}

export default Hero;
