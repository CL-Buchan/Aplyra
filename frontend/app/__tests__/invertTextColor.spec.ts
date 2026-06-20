import { expect, test } from 'vitest';
import { invertTextColour } from '../helpers/invertTextColour';

test('Tests various colours to see if white or black is returned', () => {
	expect(invertTextColour('FFFFFF')).toBe('black');
	expect(invertTextColour('000000')).toBe('white');
	expect(invertTextColour('00FFCC')).toBe('black');
	expect(invertTextColour('400000')).toBe('white');
});
