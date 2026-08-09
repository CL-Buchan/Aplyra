'use client';

import Nav from '@/app/components/ui/Nav';
import Sidebar from '@/app/components/ui/Sidebar';
import { NavProps } from '@/app/types/global.types';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Props = NavProps & { children: React.ReactNode };

export default function AppShell({ initialUser, children }: Props) {
	const pathname = usePathname();
	const isRoot = pathname === '/';
	const [isSidebarHovered, setIsSidebarHovered] = useState(false);

	return (
		<>
			{isRoot ? (
				<Nav initialUser={initialUser} />
			) : (
				<Sidebar
					initialUser={initialUser}
					onHoverChange={setIsSidebarHovered}
				/>
			)}

			<div
				className={clsx(
					'relative w-full flex-1 flex flex-col justify-center items-center transition-[padding-left] duration-200 ease-in-out',
					isRoot
						? ''
						: clsx(
								'py-10 pr-6',
								isSidebarHovered ? 'pl-72' : 'pl-29',
							),
				)}>
				{children}
			</div>
		</>
	);
}
