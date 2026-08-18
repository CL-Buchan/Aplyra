import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PostHog } from 'posthog-node';
import { createClient } from '@/app/services/supabase/server';

const resend = new Resend(process.env.RESEND_KEY);

const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
	host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
	const { email, name } = await req.json();

	if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
		return NextResponse.json(
			{ error: 'Enter a valid email address.' },
			{ status: 400 },
		);
	}

	const supabase = await createClient();
	const { error } = await supabase
		.from('waitlist')
		.insert({ email, first_name: name });

	if (error) {
		const errorMessage =
			error.code === '23505'
				? "You're already on the list!"
				: 'Something went wrong, please try again.';
		return NextResponse.json(
			{ error: errorMessage, code: error.code },
			{ status: error.code === '23505' ? 409 : 500 },
		);
	}

	try {
		await resend.emails.send({
			from: 'Aplyra <hello@mail.aplyra.io>',
			to: email,
			template: {
				id: process.env.RESEND_WAITLIST_TEMPLATE_ID!,
				variables: {
					first_name: name,
					unsubscribe_url: `${req.nextUrl.origin}/api/email/unsubscribe?email=${encodeURIComponent(email)}`,
				},
			},
		});
	} catch (emailError) {
		console.error('Failed to send waitlist welcome email', emailError);
		posthog.capture({
			distinctId: email,
			event: 'waitlist_email_failed',
			properties: {
				error:
					emailError instanceof Error
						? emailError.message
						: String(emailError),
			},
		});
		await posthog.shutdown();
	}

	return NextResponse.json({ success: true });
}
