import React from "react";
import { usePepemon } from "../hooks";
import { theme } from "../theme";
import { ContentCentered, Spacer, Title, WalletButton } from "../components";
import { LoadingPage } from "../views";

function withConnectedWallet(WrappedComponent: React.FC) {
  return function WithConnectedWalletComponent({ ...props }) {
    const { account } = usePepemon();

    if (!account) {
      return (
        <LoadingPage>
			<ContentCentered>
	      		<Title as="h1" size={2}>No wallet connected</Title>
				<Spacer size="md"/>
			</ContentCentered>
        </LoadingPage>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withConnectedWallet;
