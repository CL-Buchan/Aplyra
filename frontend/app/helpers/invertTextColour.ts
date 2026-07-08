import { calculateBrightnessScore } from './calculateBrightnessScore';
import { hexToRgb } from './hexToRgb';

export function invertTextColour(hex: string, amount: number) {
	// Convert to brightness based on luminance formula - ITU-R BT.601 formula
	const brightnessScore = calculateBrightnessScore(hex);
	const { r, g, b } = hexToRgb(hex);

	// Check the brightness midway point
	const colour =
		brightnessScore > 128
			? darkenColour(r, g, b, amount)
			: brightenColour(r, g, b, amount);
	return colour;
}

function rgbToHex(r: number, g: number, b: number) {
	const first = r.toString(16).padStart(2, '0');
	const second = g.toString(16).padStart(2, '0');
	const third = b.toString(16).padStart(2, '0');

	const hex = first + second + third;
	return hex;
}

function brightenColour(r: number, g: number, b: number, amount: number) {
	const rMax = Math.min(r + amount, 255);
	const gMax = Math.min(g + amount, 255);
	const bMax = Math.min(b + amount, 255);

	const hex = rgbToHex(rMax, gMax, bMax);
	if (!hex) throw new Error('Could not convert RGB value to hex');

	return hex;
}

function darkenColour(r: number, g: number, b: number, amount: number) {
	const rMax = Math.max(r - amount, 0);
	const gMax = Math.max(g - amount, 0);
	const bMax = Math.max(b - amount, 0);

	const hex = rgbToHex(rMax, gMax, bMax);
	if (!hex) throw new Error('Could not convert RGB value to hex');

	return hex;
}
