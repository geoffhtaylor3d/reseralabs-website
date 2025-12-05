const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

export const handler = async (event) => {
	const headers = {
		'Access-Control-Allow-Origin': 'https://reseralabs.com',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Content-Type': 'application/json'
	};

	if (event.requestContext?.http?.method === 'OPTIONS') {
		return { statusCode: 200, headers, body: '' };
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
				status: 'SUBSCRIBED'
			})
		});

		const data = await res.json();

		if (!res.ok) {
			return {
				statusCode: res.status,
				headers,
				body: JSON.stringify({ error: data.error?.message || 'Subscription failed' })
			};
		}

		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ success: true })
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ error: 'Internal server error' })
		};
	}
};
