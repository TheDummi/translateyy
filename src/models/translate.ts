/** @format */

import detect from './detect.js';
import languages from './languages.js';

interface TranslateOptions {
	key?: string | null;
	target?: string;
	source?: string;
}

translate.key = null;

export default async function translate(text: string, options: TranslateOptions = {}) {
	const start = Number(Date.now());
	const key = translate?.key || options?.key;

	if (!key) return { error: 'This app requires an API key.' };
	if (!text) return { error: 'No text provided' };

	if (!options?.target) options.target = (await detect(text, { key })).language;
	if (!options?.source) options.source = (await detect(text, { key })).language;

	const target = await languages(options.target as string);
	const source = await languages(options.source as string);

	const response = await fetch('https://libretranslate.com/translate', {
		method: 'POST',
		body: JSON.stringify({
			q: text,
			source: source.code || 'auto',
			target: target.code,
			format: 'text',
			alternatives: 3,
			api_key: key,
		}),
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());

	const translation = {
		content: response.translatedText,
		translated: target.name !== source.name,
		time: {
			start,
			end: Number(Date.now()),
			duration: Number(Date.now()) - start,
		},
		language: {
			source,
			target,
			certainty: response?.detectedLanguage?.confidence || 100,
		},
		text: { input: text, output: response.translatedText },
		alternatives: response.alternatives,
	};

	return translation;
}
