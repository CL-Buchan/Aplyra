import { hexToRgb } from './hexToRgb';

export function calculateBrightnessScore(hex: string) {
	if (!hex) throw new Error('Hex colour value was not provided correctly');
	if (hex.includes('#'))
		throw new Error('Pass the hex colour code without the # symbol');
	if (hex.length !== 6) throw new Error('Hex is not a complete value');

	const { r, g, b } = hexToRgb(hex);

	const brightnessScore = r * 0.299 + g * 0.587 + b * 0.114;
	return brightnessScore;
}
