import { createClient } from '@/app/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
	try {
		const supabase = await createClient();
		const { data, error: getUserError } = await supabase.auth.getUser();

		if (getUserError)
			return NextResponse.json(
				{ error: 'Error - authentication error, could not fetch user' },
				{ status: 401 },
			);

		if (!data || !data.user.id || data.user.role !== 'authenticated')
			return NextResponse.json(
				{ error: 'Error - no user was returned' },
				{ status: 400 },
			);

		const user = data;
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : `${error}` },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	const { user, mode } = await req.json();

	if (!user)
		return NextResponse.json(
			{ error: `Data was not complete for ${mode} method` },
			{ status: 400 },
		);

	try {
		const supabase = await createClient();
		const { username, password } = user;

		// Handle login flow
		if (mode === 'login') {
			const { data: LoginResponse, error: LoginError } =
				await supabase.auth.signInWithPassword({
					email: username,
					password: password,
				});

			if (LoginError)
				return NextResponse.json(
					{ error: 'Error - user was not logged in' },
					{ status: 401 },
				);
			if (
				!LoginResponse.user?.id ||
				LoginResponse.user?.role !== 'authenticated'
			)
				return NextResponse.json(
					{
						error: 'Could not log user in - username or password may have been incorrect',
					},
					{ status: 401 },
				);

			return NextResponse.json(
				{ success: 'User was successfully logged in' },
				{ status: 200 },
			);
		}

		// Handle signup flow
		const { data, error: SignUpError } = await supabase.auth.signUp({
			email: username,
			password: password,
		});

		if (SignUpError)
			return NextResponse.json(
				{ error: 'Error - could not sign user up' },
				{ status: 401 },
			);

		return NextResponse.json(
			{ success: 'User was successfully signed up' },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: error instanceof Error ? error.message : `${error}` },
			{ status: 500 },
		);
	}
}
