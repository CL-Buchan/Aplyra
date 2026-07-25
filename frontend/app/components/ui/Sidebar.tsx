'use client';

import { createClient } from '@/app/services/supabase/client';
import { SidebarProps } from '@/app/types/global.types';
import {
	LayoutGrid02,
	LogOut01,
	UploadCloud01,
	UserCircle,
} from '@untitledui/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type NavLink = {
	text: string;
	route: string;
	icon?: typeof LayoutGrid02;
};

const navLinks: NavLink[] = [
	{ text: 'Applications', route: '/applications', icon: LayoutGrid02 },
	{ text: 'Upload', route: '/upload', icon: UploadCloud01 },
];

const guestLinks: NavLink[] = [
	{ text: 'Login', route: '/auth/login' },
	{ text: 'Sign Up', route: '/auth/sign-up' },
];

export default function Sidebar({ initialUser }: SidebarProps) {
	const [email, setEmail] = useState(initialUser?.email ?? '');
	const [userLoggedIn, setUserLoggedIn] = useState(!!initialUser);
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();
	const isInitialAuthEvent = useRef(true);
	const supabase = createClient();

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			const skipToast = isInitialAuthEvent.current;
			isInitialAuthEvent.current = false;

			switch (event) {
				case 'TOKEN_REFRESHED':
					setUserLoggedIn(!!session?.user);
					setEmail(session?.user?.email ?? '');
					break;
				case 'SIGNED_IN':
					setUserLoggedIn(!!session?.user);
					setEmail(session?.user?.email ?? '');
					if (!skipToast) {
						toast.success('You have successfully logged in!');
					}
					break;
				case 'SIGNED_OUT':
					setUserLoggedIn(false);
					setEmail('');
					if (!skipToast) {
						toast.success('You have successfully signed out!');
					}
					break;
				default:
					break;
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	async function signUserOut() {
		setIsLoading(true);

		const { error } = await supabase.auth.signOut({ scope: 'local' });
		if (error) {
			toast.error('Failed to sign out.');
		}

		setIsLoading(false);
	}

	const links = userLoggedIn ? navLinks : guestLinks;

	return (
		<aside className='fixed top-6 bottom-6 left-6 z-50 flex w-60 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur-md shadow-[0_24px_60px_-8px_rgba(0,0,0,0.6)]'>
			<div className='flex flex-col gap-6'>
				<Link
					href='/'
					className='px-2.5 text-base font-semibold tracking-tighter text-white'>
					Trove
				</Link>

				<ul className='flex flex-col gap-0.5'>
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
									{Icon && <Icon width={18} height={18} />}
									{text}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			{userLoggedIn && (
				<div className='flex flex-col gap-2 border-t border-white/10 pt-4'>
					<div className='flex items-center justify-between gap-2.5 rounded-[7px] px-2.5 py-2'>
						<Link
							href='/user/profile'
							className={clsx(
								'flex min-w-0 items-center gap-2.5 text-[13px] transition-colors duration-300 ease-in-out',
								pathname === '/user/profile'
									? 'font-medium text-white'
									: 'text-[#888888] hover:text-white',
							)}>
							<UserCircle width={18} height={18} className='shrink-0' />
							<span className='truncate'>{email || 'Account'}</span>
						</Link>

						<button
							type='button'
							onClick={signUserOut}
							disabled={isLoading}
							aria-label='Sign out'
							className='shrink-0 text-[#888888] transition-colors duration-300 ease-in-out hover:text-white disabled:opacity-50'>
							<LogOut01 width={16} height={16} />
						</button>
					</div>
				</div>
			)}
		</aside>
	);
}
