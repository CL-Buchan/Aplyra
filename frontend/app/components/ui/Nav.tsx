'use client';

import { createClient } from '@/app/services/supabase/client';
import { NavProps } from '@/app/types/global.types';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Button from './Button';

const publicLinks = [{ text: 'Home', route: '/' }];

const authedLinks = [
	{ text: 'Applications', route: '/applications' },
	{ text: 'Upload', route: '/upload' },
];

const guestLinks = [
	{ text: 'Login', route: '/auth/login' },
	{ text: 'Sign Up', route: '/auth/sign-up' },
];

export default function Nav({ initialUser }: NavProps) {
	const [username, setUsername] = useState(initialUser?.email ?? '');
	const [userLoggedIn, setUserLoggedIn] = useState(!!initialUser);
	const [isLoading, setIsLoading] = useState(false);
	const pathname = usePathname();
	const isInitialAuthEvent = useRef(true);
	const supabase = createClient();
	const isMobile = useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			const skipToast = isInitialAuthEvent.current;
			isInitialAuthEvent.current = false;

			switch (event) {
				case 'TOKEN_REFRESHED':
					setUserLoggedIn(!!session?.user);
					setUsername(session?.user?.email ?? '');
					break;
				case 'SIGNED_IN':
					setUserLoggedIn(!!session?.user);
					setUsername(session?.user?.email ?? '');
					if (!skipToast) {
						toast.success('You have successfully logged in!');
					}
					break;
				case 'SIGNED_OUT':
					setUserLoggedIn(false);
					setUsername('');
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

	const links = userLoggedIn
		? [...publicLinks, ...authedLinks]
		: [...publicLinks, ...guestLinks];

	async function signUserOut() {
		setIsLoading(true);

		const { error } = await supabase.auth.signOut({ scope: 'local' });
		if (error) {
			toast.error('Failed to sign out.');
		}

		setIsLoading(false);
	}

	return (
		<div className='relative w-full flex justify-center mt-10 z-50'>
			{userLoggedIn ? (
				<div className='fixed flex flex-col md:flex-row justify-center items-center gap-20'>
					<nav className='px-10 py-2 rounded-3xl bg-white/5 backdrop-blur-md z-10'>
						<ul className='flex flex-col md:flex-row gap-10'>
							{links.map(({ text, route }) => (
								<li
									key={route}
									className={clsx(
										'px-5 py-0.5 rounded-2xl text-center',
										pathname === route
											? 'bg-white/10 backdrop-blur-md'
											: '',
									)}>
									<Link href={route}>{text}</Link>
								</li>
							))}
						</ul>
					</nav>

					<div className='flex items-center gap-5 px-10 py-2 rounded-3xl bg-white/5 backdrop-blur-md z-10'>
						<p>Welcome, {username.slice(0, 5) ?? 'Username'}...</p>
						<Button onClick={signUserOut} disabled={isLoading}>
							Sign Out
						</Button>
					</div>
				</div>
			) : (
				<nav className='fixed px-10 py-2 rounded-3xl bg-white/5 backdrop-blur-md z-10'>
					<ul className='flex flex-col md:flex-row gap-10'>
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
			)}
		</div>
	);
}
