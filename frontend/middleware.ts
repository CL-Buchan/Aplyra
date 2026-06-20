import { NextRequest } from 'next/server';
import { proxy } from './proxy';

export async function middleware(request: NextRequest) {
	return await proxy(request);
}

// Matches all paths except those specified below
export const config = {
	matcher: [
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
