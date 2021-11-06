import React from "react";
import { usePepemon } from "../hooks";
import { ContentCentered, Spacer, Title } from "../components";
import { LoadingPage } from "../views";

function withConnectedWallet(WrappedComponent: React.FC) {
  return function WithConnectedWalletComponent({ ...props }) {
    const { account } = usePepemon();

    if (!account) {
      return (
        <LoadingPage>
			<ContentCentered>
	      		<Title as="h1" size='l'>No wallet connected</Title>
				<Spacer size="md"/>
			</ContentCentered>
        </LoadingPage>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withConnectedWallet;
