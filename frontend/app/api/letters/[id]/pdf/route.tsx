import { cleanLetterText } from '@/app/helpers/letterFormatting';
import { createClient } from '@/app/services/supabase/server';
import {
	Document,
	Page,
	renderToBuffer,
	StyleSheet,
	Text,
} from '@react-pdf/renderer';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const styles = StyleSheet.create({
	page: {
		paddingTop: 56,
		paddingBottom: 56,
		paddingHorizontal: 60,
		fontSize: 11,
		fontFamily: 'Helvetica',
		lineHeight: 1.5,
	},
	paragraph: {
		marginBottom: 12,
	},
});

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data: letter, error } = await supabase
		.from('letters')
		.select('letter, status')
		.eq('id', id)
		.eq('user_id', user.id)
		.single();

	if (error || !letter || letter.status !== 'complete' || !letter.letter) {
		return NextResponse.json({ error: 'Letter not found' }, { status: 404 });
	}

	const paragraphs = cleanLetterText(letter.letter)
		.split(/\n{2,}/)
		.filter(Boolean);

	const buffer = await renderToBuffer(
		<Document>
			<Page size='A4' style={styles.page}>
				{paragraphs.map((paragraph, index) => (
					<Text key={index} style={styles.paragraph}>
						{paragraph}
					</Text>
				))}
			</Page>
		</Document>,
	);

	return new NextResponse(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'inline; filename="cover-letter.pdf"',
		},
	});
}
