import styled from "styled-components";
import { theme } from "../../theme";
import { ContentBox, ContentBoxGrid, ContentCentered, Title, Text, Spacer } from "../../components";
import { discord, telegram, twitter, medium } from "../../assets";

const SocialBoxes = () => {
	return (
		<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
			<Title as="h1" font={theme.font.neometric} size={3} lineHeight={1.04} weight={900} align="center">
				Say hi and meet all the Pepetrainers
			</Title>
			<Spacer size="md"/>
			<Text as="p" font={theme.font.spaceMace} align="center" underline>Our socials</Text>
			<Spacer size="lg"/>
			<ContentBoxGrid gridTemplate='"socialBox1 socialBox2 socialBox3 socialBox4"'>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox1", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon loading="lazy" src={twitter} alt="twitter"/>
					<Spacer size="sm"/>
					<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Twitter</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Follow us on Twitter for all updates and anouncements.</Text>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox2", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon loading="lazy" src={telegram} alt="telegram"/>
					<Spacer size="sm"/>
					<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Telegram</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Join us on Telegram to ask us questions and talk with your fellow Pepemon trainers.</Text>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox3", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon loading="lazy" src={discord} alt="discord"/>
					<Spacer size="sm"/>
					<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Discord</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Come hang out with us and all the Pepemon trainers on Discord.</Text>
				</ContentBox>
				<ContentBox bgColor={theme.color.purple[300]} style={{ gridArea: "socialBox4", boxShadow: "0 18.7px 14.2px 0 rgba(0, 0, 0, 0.1)" }}>
					<StyledSocialIcon loading="lazy" src={medium} alt="medium"/>
					<Spacer size="sm"/>
					<Text as="p" size={2} font={theme.font.neometric} weight={900} align="center">Medium</Text>
					<Spacer size="sm"/>
					<Text as="p" align="center" lineHeight={1.5}>Find more detailed articles on Medium about Pepemon and the ecosystem.</Text>
				</ContentBox>
			</ContentBoxGrid>
		</ContentCentered>
	)
}

const StyledSocialIcon = styled.img`
	margin-left: auto;
	margin-right: auto;
	width: 3.75em;
`

export default SocialBoxes;
