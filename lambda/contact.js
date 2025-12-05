import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const TO_EMAIL = 'contact@reseralabs.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@reseralabs.com';

const ALLOWED_ORIGINS = [
	'https://reseralabs.com',
	'http://localhost:5173',
	'http://localhost:4173'
];

function getCorsHeaders(origin) {
	const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
	return {
		'Access-Control-Allow-Origin': allowedOrigin,
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS'
	};
}

export const handler = async (event) => {
	const origin = event.headers?.origin || '';
	const corsHeaders = getCorsHeaders(origin);
	if (event.requestContext?.http?.method === 'OPTIONS') {
		return { statusCode: 200, headers: corsHeaders, body: '' };
	}

	try {
		const body = JSON.parse(event.body);
		const { name, email, company, jobTitle, organizationType, industry, message } = body;

		if (!name || !email || !message) {
			return {
				statusCode: 400,
				headers: corsHeaders,
				body: JSON.stringify({ error: 'Name, email, and message are required' })
			};
		}

		const emailBody = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Job Title: ${jobTitle || 'Not provided'}
Organization Type: ${organizationType || 'Not provided'}
Industry: ${industry || 'Not provided'}

Message:
${message}
`.trim();

		const command = new SendEmailCommand({
			Source: FROM_EMAIL,
			Destination: {
				ToAddresses: [TO_EMAIL]
			},
			Message: {
				Subject: {
					Data: `ReseraLabs Contact: ${name} from ${company || 'Unknown Company'}`,
					Charset: 'UTF-8'
				},
				Body: {
					Text: {
						Data: emailBody,
						Charset: 'UTF-8'
					}
				}
			},
			ReplyToAddresses: [email]
		});

		await ses.send(command);

		return {
			statusCode: 200,
			headers: corsHeaders,
			body: JSON.stringify({ success: true })
		};
	} catch (err) {
		console.error('Error sending email:', err);
		return {
			statusCode: 500,
			headers: corsHeaders,
			body: JSON.stringify({ error: 'Failed to send message. Please try again.' })
		};
	}
};
