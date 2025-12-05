const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

const corsHeaders = {
	'Access-Control-Allow-Origin': 'https://reseralabs.com',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

export const handler = async (event) => {
	if (event.requestContext?.http?.method === 'OPTIONS') {
		return { statusCode: 200, headers: corsHeaders, body: '' };
	}

	try {
		const body = JSON.parse(event.body);

		const res = await fetch(`https://api.emailoctopus.com/lists/${LIST_ID}/contacts`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email_address: body.email,
				fields: {
					FirstName: body.firstName,
					LastName: body.lastName,
					Company: body.company,
					JobTitle: body.jobTitle,
					OrganizationType: body.organizationType,
					Industry: body.industry,
					ContactPermission: body.contactPermission
				},
				status: 'subscribed'
			})
		});

		const data = await res.json();

		if (!res.ok) {
			let errorMessage = data.error?.message || 'Subscription failed';
			if (res.status === 409) {
				errorMessage = 'This email is already subscribed.';
			}
			return {
				statusCode: res.status,
				headers: corsHeaders,
				body: JSON.stringify({ error: errorMessage })
			};
		}

		return {
			statusCode: 200,
			headers: corsHeaders,
			body: JSON.stringify({ success: true })
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Internal server error' })
		};
	}
};
