import posthog from 'posthog-js';

if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host:
			process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
		person_profiles: 'always',
		capture_pageview: true,
		capture_pageleave: true,
	});
}

export function onRouterTransitionStart(
	url: string,
	navigationType: 'push' | 'replace' | 'traverse',
) {
	posthog.capture('$pageview', { url, navigation_type: navigationType });
}
