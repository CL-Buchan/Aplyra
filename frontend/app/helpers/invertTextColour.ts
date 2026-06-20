import { hexToRgb } from './hexToRgb';

export function invertTextColour(hex: string) {
	if (!hex) throw new Error('Hex colour value was not provided correctly');

	const { r, g, b } = hexToRgb(hex);

	// Convert to brightness based on luminance formula - ITU-R BT.601 formula
	const brightnessScore = r * 0.299 + g * 0.587 + b * 0.114;

	// Check the brightness midway point
	const colour = brightnessScore > 128 ? 'black' : 'white';
	return colour;
}
