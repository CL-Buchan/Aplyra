'use client';

import { createClient } from '@/app/services/supabase/client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const publicLinks = [{ text: 'Home', route: '/' }];

const authedLinks = [
	{ text: 'Applications', route: '/applications' },
	{ text: 'Upload', route: '/upload' },
];

const guestLinks = [
	{ text: 'Login', route: '/auth/login' },
	{ text: 'Sign Up', route: '/auth/sign-up' },
];

export default function Nav() {
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const supabase = createClient();

		const syncUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUserLoggedIn(!!user);
		};

		syncUser();

		// Subscribe and listen for user log-in and log-out changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			switch (event) {
				case 'TOKEN_REFRESHED':
					setUserLoggedIn(!!session?.user);
					break;
				case 'SIGNED_IN':
					setUserLoggedIn(!!session?.user);
					toast.success('You have successfully logged in!');
					break;
				case 'SIGNED_OUT':
					setUserLoggedIn(!!session?.user);
					toast.success('You have successfully signed out!');
					break;
				default:
					break;
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	const links = userLoggedIn
		? [...publicLinks, ...authedLinks]
		: [...publicLinks, ...guestLinks];

	return (
		<div className='relative w-full flex justify-center pt-10 z-50'>
			<nav className='fixed px-10 py-2 rounded-3xl bg-white/5 backdrop-blur-md z-10'>
				<ul className='flex flex-row gap-10'>
					{links.map(({ text, route }) => (
						<li
							key={route}
							className={clsx(
								'px-5 py-0.5 rounded-2xl',
								pathname === route
									? 'bg-white/10 backdrop-blur-md'
									: '',
							)}>
							<Link href={route}>{text}</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
