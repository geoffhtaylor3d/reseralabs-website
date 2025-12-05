const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

async function syncFields() {
	if (!API_KEY || !LIST_ID) {
		console.error('Missing EMAILOCTOPUS_API_KEY or EMAILOCTOPUS_LIST_ID');
		process.exit(1);
	}

	const res = await fetch(`https://api.emailoctopus.com/lists/${LIST_ID}`, {
		headers: { Authorization: `Bearer ${API_KEY}` }
	});

	if (!res.ok) {
		console.error('Failed to fetch list:', await res.text());
		process.exit(1);
	}

	const data = await res.json();
	const fields = data.fields.filter((f: any) => f.tag !== 'EmailAddress');

	const config = {
		listId: LIST_ID,
		fields: fields.map((f: any) => ({
			tag: f.tag,
			label: f.label,
			type: f.type,
			choices: f.choices || null
		}))
	};

	await Bun.write(
		'src/lib/emailoctopus-config.json',
		JSON.stringify(config, null, 2)
	);

	console.log('Synced EmailOctopus fields to src/lib/emailoctopus-config.json');
}

syncFields();
