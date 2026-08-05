/**
 * Some model responses tack on a meta-commentary section after the letter
 * itself (eg. "--- **Why this works:** ..."). Cut everything from the first
 * such marker onward, then strip markdown emphasis so the remaining text is
 * clean prose for PDF rendering.
 */
export function cleanLetterText(raw: string): string {
	const metaCommentaryPattern = /\n\s*(-{3,}|\*?\s*why this works\b)/i;
	const match = raw.match(metaCommentaryPattern);
	const body = match?.index !== undefined ? raw.slice(0, match.index) : raw;

	return body
		.replace(/\*\*(.*?)\*\*/g, '$1')
		.replace(/(?<!\n)\n(?!\n)/g, ' ')
		.replace(/[ \t]+/g, ' ')
		.trim();
}
