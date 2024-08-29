async function languages(language) {
  const response = await fetch("https://libretranslate.com/languages", {
    headers: { "Content-Type": "application/json" }
  }).then((res) => res.json());
  const detection = response.find((lang) => lang.code.toLowerCase() === language.toLowerCase() || lang.name.toLowerCase() === language.toLowerCase());
  if (detection) return detection;
  else return response;
}

detect.key = null;
async function detect(text, options) {
  if (!detect.key && !options.key) return "This app requires an API key.";
  if (!text) return "No text provided.";
  const response = (await fetch("https://libretranslate.com/detect", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      api_key: detect?.key || options?.key
    }),
    headers: { "Content-Type": "application/json" }
  }).then((res) => res.json()))?.[0];
  return response;
}

translate.key = null;
async function translate(text, options = {}) {
  const start = Number(Date.now());
  const key = translate?.key || options?.key;
  if (!key) return { error: "This app requires an API key." };
  if (!text) return { error: "No text provided" };
  if (!options?.target) options.target = (await detect(text, { key })).language;
  if (!options?.source) options.source = (await detect(text, { key })).language;
  const target = await languages(options.target);
  const source = await languages(options.source);
  const response = await fetch("https://libretranslate.com/translate", {
    method: "POST",
    body: JSON.stringify({
      q: text,
      source: source.code || "auto",
      target: target.code,
      format: "text",
      alternatives: 3,
      api_key: key
    }),
    headers: { "Content-Type": "application/json" }
  }).then((res) => res.json());
  const translation = {
    content: response.translatedText,
    translated: target.name !== source.name,
    time: {
      start,
      end: Number(Date.now()),
      duration: Number(Date.now()) - start
    },
    language: {
      source,
      target,
      certainty: response?.detectedLanguage?.confidence || 100
    },
    text: { input: text, output: response.translatedText },
    alternatives: response.alternatives
  };
  return translation;
}

export { translate as default, detect, languages, translate };
