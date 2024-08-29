/** @format */

export default async function languages(language: string) {
	const response = await fetch('https://libretranslate.com/languages', {
		headers: { 'Content-Type': 'application/json' },
	}).then((res) => res.json());

	const detection = response.find((lang: any) => lang.code.toLowerCase() === language.toLowerCase() || lang.name.toLowerCase() === language.toLowerCase());

	if (detection) return detection;
	else return response;
}
