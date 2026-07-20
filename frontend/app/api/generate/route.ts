import { NextRequest, NextResponse } from 'next/server';
import { LetterRequest, LetterResponse } from '@/app/types/global.types';

export async function POST(req: NextRequest) {
	try {
		const body: LetterRequest = await req.json();

		const resp = await fetch(
			`${process.env.PYTHON_API_URL}/generate/letter`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			},
		);

		if (!resp.ok) {
			const errText = await resp.text();
			return NextResponse.json(
				{ error: errText },
				{ status: resp.status },
			);
		}

		const data: LetterResponse = await resp.json();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : `${error}` },
			{ status: 500 },
		);
	}
}
