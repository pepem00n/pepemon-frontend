import React from "react";
import { usePepemon } from "../hooks";
import { Head } from "../components";

function withConnectedWallet(WrappedComponent: React.FC, props) {
	function WithConnectedWalletComponent(props) {

		const { account } = usePepemon();

		return (
			<>
				<Head {...props.metas}/>
				<WrappedComponent {...props} />
			</>
		);
	};

	return () => <WithConnectedWalletComponent {...props}/>
}

export default withConnectedWallet;
