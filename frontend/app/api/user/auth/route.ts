import { createClient } from '@/app/services/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { user: userDetails, mode } = await req.json();
		if (!userDetails)
			return NextResponse.json(
				{
					error: `Data was not complete for ${mode} method`,
					user: null,
				},
				{ status: 400 },
			);

		const { username, password } = userDetails;

		if (!username || username === '' || !password || password === '')
			return NextResponse.json(
				{ error: 'Please enter a username and password', user: null },
				{ status: 400 },
			);

		const supabase = await createClient();

		if (!username.trim())
			return NextResponse.json(
				{ error: 'Enter username', user: null },
				{ status: 400 },
			);

		const emailHosts = ['gmail', 'outlook', 'icloud', 'yahoo', 'student'];
		if (
			!username.trim().includes('@') ||
			!emailHosts.some((host) =>
				username.trim().toLowerCase().includes(host),
			)
		)
			return NextResponse.json(
				{
					error: 'Username needs to be your email and include an @ symbol',
					user: null,
				},
				{ status: 400 },
			);

		if (!password.trim())
			return NextResponse.json(
				{ error: 'Enter password', user: null },
				{ status: 400 },
			);

		if (password.trim().length <= 6 || !/[!#$%^&*]/.test(password.trim()))
			return NextResponse.json(
				{
					error: 'Password length is not greater than 6 characters, and or does not contain special characters',
					user: null,
				},
				{ status: 400 },
			);

		// Handle login flow
		if (mode === 'login') {
			const { data: LoginResponse, error: LoginError } =
				await supabase.auth.signInWithPassword({
					email: username.trim(),
					password: password.trim(),
				});

			if (
				LoginError ||
				!LoginResponse.user?.id ||
				LoginResponse.user?.role !== 'authenticated'
			)
				return NextResponse.json(
					{
						error: 'Could not log user in - username or password may have been incorrect',
						user: null,
					},
					{ status: 401 },
				);

			return NextResponse.json(
				{ error: null, user: LoginResponse.user },
				{ status: 200 },
			);
		}

		const origin = req.nextUrl.origin;
		const {
			data: { user },
			error: SignUpError,
		} = await supabase.auth.signUp({
			email: username.trim().toLowerCase(),
			password: password.trim(),
			options: { emailRedirectTo: `${origin}/api/supabase/auth` },
		});

		if (SignUpError || !user)
			return NextResponse.json(
				{ error: 'Error - could not sign user up', user: null },
				{ status: 401 },
			);

		return NextResponse.json({ error: null, user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : `${error}`,
				user: null,
			},
			{ status: 500 },
		);
	}
}
