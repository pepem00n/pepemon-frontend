import React from "react";
import { usePepemon } from "../hooks";
import { ContentCentered, Head, Spacer, Title } from "../components";
import { LoadingPage } from "../views";

function withConnectedWallet(WrappedComponent: React.FC, props) {
	function WithConnectedWalletComponent(props) {

		const { account } = usePepemon();

		return (
			<>
				<Head {...props.metas}/>
				{ !account ?
					<LoadingPage>
						<ContentCentered>
				      		<Title as="h1" size='l'>No wallet connected</Title>
							<Spacer size="md"/>
						</ContentCentered>
			        </LoadingPage>
					: <WrappedComponent {...props} />
				}
			</>
		);
	};

	return () => <WithConnectedWalletComponent {...props}/>
}

export default withConnectedWallet;
