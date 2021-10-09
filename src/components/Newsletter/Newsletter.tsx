import { theme } from "../../theme";
import { Button, ContentCentered, Title, Text, Spacer } from "../../components";

const Newsletter = () => {
	return (
		<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
			<Title as="h1" font={theme.font.neometric} size={3} weight={900} align="center">
				Stay up to date and claim ‘em all
			</Title>
			<Spacer size="md"/>
			<Text as="p" font={theme.font.spaceMace} align="center" underline>Newsletter</Text>
			<Spacer size="md"/>
			<Text as="p" font={theme.font.inter} lineHeight={1.5} align="center">
				Be the first to collect all the new Pepemons. You can unsunscribe anytime.
			</Text>
			<Spacer size="md"/>
			<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[600]}` }}>
					<input className="input-email-text" type="email" />
					<Button styling="purple">Sign up</Button>
			</ContentCentered>
		</ContentCentered>
	)
}

export default Newsletter;
