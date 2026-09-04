'use client';

import { createClient } from '@/app/services/supabase/client';
import { SidebarProps } from '@/app/types/global.types';
import {
	Key01,
	LayoutGrid02,
	LogIn01,
	LogOut01,
	Paperclip,
	UploadCloud01,
	UserCircle,
} from '@untitledui/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

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

const guestLinks: NavLink[] = [
	{ text: 'Login', route: '/auth/login', icon: LogIn01 },
	{ text: 'Sign Up', route: '/auth/sign-up', icon: Key01 },
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
	});

	async function signUserOut() {
		setIsLoading(true);

		const { error } = await supabase.auth.signOut({ scope: 'local' });
		if (error) {
			toast.error('Failed to sign out.');
		} else {
			posthog.reset();
		}

		setIsLoading(false);

		setTimeout(() => {
			redirect('/');
		}, 900);
	}

	const links = userLoggedIn ? navLinks : guestLinks;

	return (
		<aside
			id='sidebar'
			className={
				'w-40 min-h-screen z-50 flex flex-col justify-between overflow-hidden border-r border-white/10 bg-white/5 backdrop-blur-md shadow-[0_24px_60px_-8px_rgba(0,0,0,0.6)]'
			}>
			<div className='flex flex-col gap-7'>
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
		</aside>
	);
}
