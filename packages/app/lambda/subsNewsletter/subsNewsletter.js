const { Client } = require("@sendgrid/client");

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
	const client = new Client();
	client.setApiKey(process.env.SENDGRID_API_KEY);

	const email = event.queryStringParameters.email;

	const request = {
		method: "PUT",
		url: "/v3/marketing/contacts",
		body: {
			list_ids: [process.env.SENDGRID_PPMN_CONTACTS_LIST_ID],
			contacts: [{ email }],
		},
	};

	try {
		const [req] = await client.request(request);

		return {
			statusCode: req.statusCode,
			body: JSON.stringify({
				title: 'Sign up succeeded',
				message: 'You are now subscribed to the pepemon newsletter.'
			})
		}
	} catch (error) {
		return {
			statusCode: error.code,
			body: JSON.stringify({
				title: 'Sign up failed',
				message: 'Something went wrong. Please try again.'
			})
		}
	}
}

module.exports = { handler }
