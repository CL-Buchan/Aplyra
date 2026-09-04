'use client';

import Nav from '@/app/components/ui/Nav';
import Sidebar from '@/app/components/ui/Sidebar';
import { NavProps } from '@/app/types/global.types';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { useEffect, useRef } from 'react';
import Profile from './Profile';

type Props = NavProps & { children: React.ReactNode };

export default function AppShell({ initialUser, children }: Props) {
	const pathname = usePathname();
	const isRoot = pathname === '/';
	const isUnsubscribed = pathname === '/email/confirmation';
	const identifiedUserId = useRef<string | null>(null);

	useEffect(() => {
		if (!initialUser || identifiedUserId.current === initialUser.id) return;

		posthog.identify(initialUser.id, { email: initialUser.email });
		identifiedUserId.current = initialUser.id;
	}, [initialUser]);

	return (
		<div className='flex flex-row'>
			{isRoot || isUnsubscribed ? (
				<Nav initialUser={initialUser} />
			) : (
				<Sidebar initialUser={initialUser} />
			)}

			<div
				className={
					'relative w-full flex-1 flex flex-col justify-center items-center overflow-y-scroll'
				}>
				{children}
			</div>
		</div>
	);
}
