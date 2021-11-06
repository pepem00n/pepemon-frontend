import React, { useState } from "react";
import styled from "styled-components/macro";
import { theme } from "../../theme";
import { api } from "../../constants";
import { Button, ContentCentered, Modal, ModalTitle, ModalContent, ModalActions, Title, Text, Spacer } from "../../components";

const Newsletter: React.FC<any> = () => {
	const [email, setEmail] = useState('');

	const initSignUpState = {
		success: undefined,
		title: '',
		message: ''
	};
	const [signUpState, setSignUpState] = useState(initSignUpState);

	// @dev: run `netlify dev --live` to test the function
	const handleSignUp = async () => {
		const lambdaApiEndpoint = api.lambdaApi.endpoint;
		const lambdaApiFunction = api.lambdaApi.functions.subsNewsletter;

		const req = await fetch(`${lambdaApiEndpoint+lambdaApiFunction}?email=${email}`);

		if (req.status === 202) {
			setSignUpState({
				success: true,
				title: 'Sign up succeeded',
				message: 'You are now subscribed to the pepemon newsletter.'
			});
		} else {
			setSignUpState({
				success: false,
				title: 'Sign up failed',
				message: 'Something went wrong. Please try again.'
			});
		}
		// reset input
		setEmail('');
	}

	return (
		<>
			<ContentCentered style={{paddingTop: "7.5em", paddingBottom: "7.5em"}}>
				<Title as="h1" font={theme.font.neometric} size='xxl' weight={900} align="center">
					Stay up to date and claim ‘em all
				</Title>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.spaceMace} align="center" underline>Newsletter</Text>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.inter} lineHeight={1.5} align="center">
					Be the first to collect all the new Pepemons.
				</Text>
				<Spacer size="md"/>
				<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[600]}`, overflow: 'hidden' }}>
						<StyledInput onChange={(e) => setEmail(e.target.value)} type="email" />
						<Button styling="purple" disabled={email ? false : true} onClick={handleSignUp}>Sign up</Button>
				</ContentCentered>
			</ContentCentered>
			{ signUpState.success !== undefined &&
				<Modal onDismiss={() => setSignUpState(initSignUpState)}>
					<ModalTitle text={signUpState.title}/>
					<ModalContent>
						<Text align='center' font={theme.font.inter} size={.875} color={theme.color.gray[600]}>
							{signUpState.message}
						</Text>
					</ModalContent>
					<Spacer size='md'/>
					<ModalActions>
						<Button styling='purple' onClick={() => setSignUpState(initSignUpState)}>{
							signUpState.success ? 'Great!' : 'I\'ll try again'
						}</Button>
					</ModalActions>
				</Modal>
			}
		</>
	)
}

const StyledInput = styled.input`
	border: none;
	font-size: 1.2rem;
	padding: 0.5em;
	&:focus-visible {
		outline: none;
	}
`

export default Newsletter;
