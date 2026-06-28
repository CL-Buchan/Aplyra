import { createClient } from '@/app/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get('code');

	if (!code)
		return NextResponse.json(
			{ error: 'Could not fetch code from query params' },
			{ status: 404 },
		);

	// Session token is stored in cookies through supabase createClient
	const supabase = await createClient();
	const { data, error } = await supabase.auth.exchangeCodeForSession(code);

	if (error || !data.session)
		return NextResponse.json(
			{ error: 'Session exchange failed' },
			{ status: 500 },
		);

	return NextResponse.redirect(new URL('/', request.url));
}
