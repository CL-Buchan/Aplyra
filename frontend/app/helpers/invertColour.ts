import { calculateBrightnessScore } from './calculateBrightnessScore';

export function invertColour(hex: string): 'black' | 'white' {
	const brightnessScore = calculateBrightnessScore(hex);

	const colour = brightnessScore > 128 ? 'black' : 'white';
	return colour;
}
