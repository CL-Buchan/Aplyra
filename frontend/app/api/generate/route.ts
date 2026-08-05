import { NextRequest, NextResponse } from 'next/server';
import { LetterRequest, LetterResponse } from '@/app/types/global.types';
import { createClient } from '@/app/services/supabase/server';

type GenerateRequest = LetterRequest & { letterId: number };

export async function POST(req: NextRequest) {
	const { letterId, ...body }: GenerateRequest = await req.json();
	const supabase = await createClient();

	try {
		const resp = await fetch(
			`${process.env.PYTHON_API_URL}/generate/letter`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body satisfies LetterRequest),
			},
		);

		if (!resp.ok) {
			const errText = await resp.text();
			await supabase
				.from('letters')
				.update({ status: 'error', error: errText })
				.eq('id', letterId);

			return NextResponse.json(
				{ error: errText },
				{ status: resp.status },
			);
		}

		const data: LetterResponse = await resp.json();

		await supabase
			.from('letters')
			.update({ status: 'complete', letter: data.letter })
			.eq('id', letterId);

		return NextResponse.json(data);
	} catch (error) {
		const message = error instanceof Error ? error.message : `${error}`;

		await supabase
			.from('letters')
			.update({ status: 'error', error: message })
			.eq('id', letterId);

		return NextResponse.json({ error: message }, { status: 500 });
	}
}
