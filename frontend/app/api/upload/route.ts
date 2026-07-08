import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const file = formData.get('file') as File | null;

	if (!file)
		return NextResponse.json(
			{ error: 'No file provided' },
			{ status: 400 },
		);

	try {
		const resp = await fetch(
			`${process.env.PYTHON_API_URL}/parse/document`,
			{ method: 'POST', body: formData },
		);

		if (!resp.ok) {
			// FastAPI puts its error message in { detail: "..." }
			const { detail } = await resp
				.json()
				.catch(() => ({ detail: 'Error parsing document' }));
			return NextResponse.json(
				{ error: detail },
				{ status: resp.status },
			);
		}

		const parsed = await resp.json();
		return NextResponse.json(parsed);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : `${error}` },
			{ status: 500 },
		);
	}
}
