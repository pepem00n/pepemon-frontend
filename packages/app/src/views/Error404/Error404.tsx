import React from "react";
import { ButtonLink, ContentCentered, Text, Title, ModalActions, Spacer } from "../../components";
import { LoadingPage } from "../../views";
import { theme } from "../../theme";

interface Error404Props {
	title?: string,
	text?: string,
}

const Error404: React.FC<Error404Props> = ({title, text}) => {
	return (
		<LoadingPage>
			<ContentCentered style={{ maxWidth: theme.breakpoints.mobile }}>
				<Title as="h1" size='l'>{ title ? title : 'Error 404: Page not found' }</Title>
				<Text>{ text ? text : 'Stay tuned for the latest news and subscribe to the our newsletter!' }</Text>
				<Spacer size="md"/>
				<ModalActions>
					<ButtonLink to='/#newsletter'>Subscribe to the Newsletter</ButtonLink>
					<ButtonLink to="/" light='true'>Return home</ButtonLink>
	            </ModalActions>
				<Spacer size="md"/>
			</ContentCentered>
		</LoadingPage>
	)
}

export default Error404;
