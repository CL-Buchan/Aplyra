import { expect, test } from 'vitest';
import { invertTextColour } from '../helpers/invertTextColour';

test('Tests various colours to see if the colour is brightened or darkened', () => {
	expect(invertTextColour('FFFFFF', 50)).toBe('cdcdcd');
	expect(invertTextColour('000000', 50)).toBe('323232');
	expect(invertTextColour('00FFCC', 25)).toBe('00e6b3');
	expect(invertTextColour('400000', 25)).toBe('591919');
});
