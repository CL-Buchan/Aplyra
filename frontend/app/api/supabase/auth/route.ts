import { createClient } from '@/app/services/supabase/server';
import { EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const code = request.nextUrl.searchParams.get('code');
	const tokenHash = request.nextUrl.searchParams.get('token_hash');
	const type = request.nextUrl.searchParams.get(
		'type',
	) as EmailOtpType | null;

	const supabase = await createClient();

	// OAuth / PKCE sign-in callbacks arrive with `code`
	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (error)
			return NextResponse.json(
				{ error: 'Session exchange failed' },
				{ status: 500 },
			);
		return NextResponse.redirect(new URL('/', request.url));
	}

	// Email confirmations, magic links, invites, and password resets
	// arrive with `token_hash` + `type` instead of `code`
	if (tokenHash && type) {
		const { error } = await supabase.auth.verifyOtp({
			token_hash: tokenHash,
			type,
		});
		if (error)
			return NextResponse.json(
				{ error: 'Session exchange failed' },
				{ status: 500 },
			);
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.json(
		{ error: 'Could not fetch code or token_hash from query params' },
		{ status: 404 },
	);
}
