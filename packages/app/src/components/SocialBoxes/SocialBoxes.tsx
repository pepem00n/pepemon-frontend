import React from "react";
import styled from "styled-components/macro";
import { theme } from "../../theme";
import { ContentBox, ContentBoxGrid, ContentCentered, Title, Text, Spacer } from "../../components";
import { discord, telegram, twitter, medium } from "../../assets";

const SocialBoxes: React.FC<any> = () => {
	return (
		<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
			<Title as="h1" font={theme.font.neometric} size='xxl' lineHeight={1.04} weight={900} align="center">
				Say hi and meet all the Pepetrainers
			</Title>
			<Spacer size="md"/>
			<Text as="p" font={theme.font.spaceMace} align="center" underline>Our socials</Text>
			<Spacer size="lg"/>
			<CustomContentBoxGrid>
				<ContentBoxLink as="a" href="https://twitter.com/pepemonfinance" target="_blank" rel="noopener noreferrer"
				bgColor={theme.color.purple[300]} gridArea="socialBox1">
					<StyledSocialIcon loading="lazy" src={twitter} alt="twitter"/>
					<Spacer size="sm"/>
					<Text as="p" size='xl' font={theme.font.neometric} weight={900} align="center">Twitter</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Follow us on Twitter for all updates and anouncements.</Text>
				</ContentBoxLink>
				<ContentBoxLink as="a" href="https://t.me/pepemonfinance" target="_blank" rel="noopener noreferrer"
				bgColor={theme.color.purple[300]} gridArea="socialBox2">
					<StyledSocialIcon loading="lazy" src={telegram} alt="telegram"/>
					<Spacer size="sm"/>
					<Text as="p" size='xl' font={theme.font.neometric} weight={900} align="center">Telegram</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Join us on Telegram to ask us questions and talk with your fellow Pepetrainers.</Text>
				</ContentBoxLink>
				<ContentBoxLink as="a" href="https://discord.com/invite/R8sZwMv" target="_blank" rel="noopener noreferrer"
				bgColor={theme.color.purple[300]} gridArea="socialBox3">
					<StyledSocialIcon loading="lazy" src={discord} alt="discord"/>
					<Spacer size="sm"/>
					<Text as="p" size='xl' font={theme.font.neometric} weight={900} align="center">Discord</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Come hang out with us and all the Pepetrainers on Discord.</Text>
				</ContentBoxLink>
				<ContentBoxLink as="a" href="https://pepemonfinance.medium.com/" target="_blank" rel="noopener noreferrer"
				bgColor={theme.color.purple[300]} gridArea="socialBox4">
					<StyledSocialIcon loading="lazy" src={medium} alt="medium"/>
					<Spacer size="sm"/>
					<Text as="p" size='xl' font={theme.font.neometric} weight={900} align="center">Medium</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Find more detailed articles on Medium about Pepemon and the ecosystem.</Text>
				</ContentBoxLink>
			</CustomContentBoxGrid>
		</ContentCentered>
	)
}

const StyledSocialIcon = styled.img`
	margin-left: auto;
	margin-right: auto;
	width: 3.75em;
`

const CustomContentBoxGrid = styled(ContentBoxGrid)`
	grid-template-areas: 'socialBox1' 'socialBox2' 'socialBox3' 'socialBox4';

	@media (min-width: ${theme.breakpoints.tabletL}) {
		grid-template-areas: 'socialBox1 socialBox2 socialBox3 socialBox4';
	}
`

const ContentBoxLink = styled(ContentBox)<{gridArea: string}>`
	box-shadow: 0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1);
	grid-area: ${props => props.gridArea};
	text-decoration: none;
`

export default SocialBoxes;
