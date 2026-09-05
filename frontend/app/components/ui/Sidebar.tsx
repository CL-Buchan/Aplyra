'use client';

import { SidebarProps } from '@/app/types/global.types';
import {
	Key01,
	LayoutGrid02,
	LogIn01,
	Paperclip,
	UploadCloud01,
	User01,
} from '@untitledui/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UsageCard from '../UsageCard';

type NavLink = { text: string; route: string; icon?: typeof LayoutGrid02 };

const navLinks: NavLink[] = [
	{ text: 'Upload', route: '/dashboard/upload', icon: UploadCloud01 },
	{ text: 'Letters', route: '/dashboard/letters', icon: Paperclip },
	{
		text: 'Applications',
		route: '/dashboard/applications',
		icon: LayoutGrid02,
	},
];

const extraLinks: NavLink[] = [
	{ text: 'Profile', route: '/dashboard/user/profile', icon: User01 },
];

const guestLinks: NavLink[] = [
	{ text: 'Login', route: '/auth/login', icon: LogIn01 },
	{ text: 'Sign Up', route: '/auth/sign-up', icon: Key01 },
];

export default function Sidebar({ initialUser }: SidebarProps) {
	const pathname = usePathname();

	const links = !!initialUser ? navLinks : guestLinks;

	return (
		<aside
			id='sidebar'
			className={
				'min-w-60 p-5 min-h-screen z-50 flex flex-col justify-between overflow-hidden border-r glass shadow-[0_24px_60px_-8px_rgba(0,0,0,0.6)]'
			}>
			<div className='flex flex-col gap-7'>
				<p className='text-lg tracking-tight'>Aplyra</p>
				<ul className='flex flex-col gap-5'>
					{links.map(({ text, route, icon: Icon }) => {
						const active = pathname === route;
						return (
							<li key={route}>
								<Link
									href={route}
									className={clsx(
										'flex items-center gap-2.5 rounded-[7px] px-2.5 py-2 text-[13px] transition-colors duration-300 ease-in-out',
										active
											? 'bg-white/10 font-medium text-white'
											: 'text-[#888888] hover:bg-white/10 hover:text-white',
									)}>
									{Icon && (
										<Icon
											width={18}
											height={18}
											color={
												active
													? 'var(--color-purple-500)'
													: 'grey'
											}
											className='shrink-0'
										/>
									)}
									{text}
								</Link>
							</li>
						);
					})}
				</ul>
				<div className='flex flex-col gap-2.5'>
					<p className='text-[10px] font-semibold tracking-widest! uppercase text-muted'>Organization</p>
					<ul>
						{extraLinks.map(({ text, route, icon: Icon }) => {
							const active = pathname === route;
							return (
								<li key={route}>
									<Link
										href={route}
										className={clsx(
											'flex items-center gap-2.5 rounded-[7px] px-2.5 py-2 text-[13px] transition-colors duration-300 ease-in-out',
											active
												? 'bg-white/10 font-medium text-white'
												: 'text-[#888888] hover:bg-white/10 hover:text-white',
										)}>
										{Icon && (
											<Icon
												width={18}
												height={18}
												color={
													active
														? 'var(--color-purple-500)'
														: 'grey'
												}
												className='shrink-0'
											/>
										)}
										{text}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			<UsageCard />
		</aside>
	);
}
