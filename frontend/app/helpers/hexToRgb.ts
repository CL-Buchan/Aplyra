export function hexToRgb(hex: string): { r: number; g: number; b: number } {
	// Trim whitespace before checks and slice methods
	hex = hex.trim();
	if (hex.length !== 6)
		throw new Error('Hex given is not a complete hex value');

	// Hex is base16 = 0-9 and then A-F
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return { r, g, b };
}
