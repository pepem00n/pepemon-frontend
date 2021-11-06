import React from "react";
import { ButtonLink, ContentCentered, Title, Spacer } from "../../components";
import { LoadingPage } from "../../views";

const Error404 = () => {
	return (
		<LoadingPage>
			<ContentCentered>
				<Title as="h1" size='l'>Error 404: Page not found</Title>
				<Spacer size="md"/>
				<ButtonLink to="/">Return home</ButtonLink>
				<Spacer size="md"/>
			</ContentCentered>
		</LoadingPage>
	)
}

export default Error404;
