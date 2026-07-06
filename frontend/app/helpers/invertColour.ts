import { calculateBrightnessScore } from './calculateBrightnessScore';

export function invertColour(hex: string): 'black' | 'white' {
	console.log('hex:', hex);
	const brightnessScore = calculateBrightnessScore(hex);
	console.log('brightness:', brightnessScore);

	const colour = brightnessScore > 128 ? 'black' : 'white';
	return colour;
}
