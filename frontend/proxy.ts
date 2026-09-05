import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
	const safeRoutes = ['/', '/auth', '/api'];
	const pathname = request.nextUrl.pathname;
	const isHitSafeRoute = safeRoutes.some((route) => {
		if (route === '/') return pathname === '/';
		return pathname === route || pathname.startsWith(route + '/');
	});

	if (isHitSafeRoute) {
		return NextResponse.next({ request });
	}

	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({ request });
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	const { data, error } = await supabase.auth.getClaims();

	if (error || !data?.claims) {
		const url = request.nextUrl.clone();
		url.pathname = '/auth/login';
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}

// Matches all paths except those specified below
export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
