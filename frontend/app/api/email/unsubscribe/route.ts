import { createClient } from '@/app/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
	const email = req.nextUrl.searchParams.get('email');

	if (!email || !EMAIL_REGEX.test(email)) {
		return NextResponse.json(
			{ error: 'A valid email address is required.' },
			{ status: 400 },
		);
	}

	const supabase = await createClient();
	const { error } = await supabase
		.from('waitlist')
		.update({ subscribed: false })
		.eq('email', email);

	if (error) {
		return NextResponse.json(
			{ error: 'Could not process waitlist unsubscription. Please try again.' },
			{ status: 500 },
		);
	}

	return NextResponse.redirect(new URL('/email/confirmation', req.url));
}
