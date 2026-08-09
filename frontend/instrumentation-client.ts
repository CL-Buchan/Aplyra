import posthog from 'posthog-js';

const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const isPostHogConfigured = Boolean(projectToken && host);

if (!isPostHogConfigured && process.env.NODE_ENV === 'development') {
	if (!projectToken) {
		console.error(
			'NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
		);
	}

	if (!host) {
		console.error(
			'NEXT_PUBLIC_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_HOST is configured',
		);
	}
}

if (projectToken && host) {
	posthog.init(projectToken, {
		api_host: host,
		person_profiles: 'always',
		capture_pageview: true,
		capture_pageleave: true,
		capture_exceptions: true,
	});
}

export function onRouterTransitionStart(
	url: string,
	navigationType: 'push' | 'replace' | 'traverse',
) {
	if (isPostHogConfigured) {
		posthog.capture('$pageview', { url, navigation_type: navigationType });
	}
}
