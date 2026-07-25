'use client';

import Nav from '@/app/components/ui/Nav';
import Sidebar from '@/app/components/ui/Sidebar';
import { NavProps } from '@/app/types/global.types';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type Props = NavProps & { children: React.ReactNode };

export default function AppShell({ initialUser, children }: Props) {
	const pathname = usePathname();
	const isRoot = pathname === '/';

	return (
		<>
			{isRoot ? (
				<Nav initialUser={initialUser} />
			) : (
				<Sidebar initialUser={initialUser} />
			)}

			<div
				className={clsx(
					'w-full flex-1 flex flex-col justify-center items-center',
					isRoot ? 'mt-10' : 'py-10 pr-6 pl-72',
				)}>
				{children}
			</div>
		</>
	);
}
