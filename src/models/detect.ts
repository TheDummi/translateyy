/** @format */

detect.key = null;

interface DetectOptions {
	key?: string | null;
}

export default async function detect(text: string, options: DetectOptions) {
	if (!detect.key && !options.key) return 'This app requires an API key.';

	if (!text) return 'No text provided.';

	const response = (
		await fetch('https://libretranslate.com/detect', {
			method: 'POST',
			body: JSON.stringify({
				q: text,

				api_key: detect?.key || options?.key,
			}),
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.json())
	)?.[0];

	return response;
}
