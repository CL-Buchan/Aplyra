'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function GlobalError({
	error,
}: Readonly<{
	error: Error & { digest?: string };
}>) {
	useEffect(() => {
		posthog.captureException(error);
	}, [error]);

	return (
		<html lang='en'>
			<body>
				<main className='flex min-h-screen items-center justify-center px-6'>
					<p>Something went wrong. Please try again.</p>
				</main>
			</body>
		</html>
	);
}
