'use client';

import { useEffect, useRef } from 'react';

export function useIsMobile(breakpoint = 768) {
	const isMobile = useRef(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia(
			`(max-width: ${breakpoint - 1}px)`,
		);

		isMobile.current = mediaQuery.matches;

		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			isMobile.current = event.matches;
		};

		mediaQuery.addEventListener('change', handleMediaQueryChange);

		return () =>
			mediaQuery.removeEventListener('change', handleMediaQueryChange);
	}, [breakpoint]);

	return isMobile;
}
