'use client';

import { createClient } from '@/app/services/supabase/client';
import { NavProps } from '@/app/types/global.types';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Button from './Button';
import { Mark } from './Mark';

const publicLinks = [
	{ text: 'Product', route: '/' },
	{ text: 'How it Works', route: '/' },
];

const authedLinks = [{ text: 'Dashboard', route: '/dashboard/applications' }];

const guestLinks = [
	{ text: 'Login', route: '/auth/login' },
	{ text: 'Sign Up', route: '/auth/sign-up' },
];

export default function Nav({ initialUser }: NavProps) {
	const [username, setUsername] = useState(initialUser?.email ?? '');
	const [userLoggedIn, setUserLoggedIn] = useState(!!initialUser);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedNavIndex, setSelectedNavIndex] = useState(0);
	const pathname = usePathname();
	const isInitialAuthEvent = useRef(true);
	const supabase = createClient();

	const scrollIntoView = () => {
		const featureSection = document.getElementById('how-it-works');

		featureSection?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center',
		});
	};

	const links = userLoggedIn
		? [...publicLinks, ...authedLinks]
		: [...publicLinks, ...guestLinks];

	async function signUserOut() {
		setIsLoading(true);

		const { error } = await supabase.auth.signOut({ scope: 'local' });
		if (error) {
			toast.error('Failed to sign out.');
		} else {
			posthog.reset();
		}

		setIsLoading(false);
	}

	useEffect(() => {
		if (selectedNavIndex === 1) {
			scrollIntoView();
		}
	}, [pathname, selectedNavIndex]);

	useEffect(() => {
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
	}, [supabase.auth]);

	return (
		<div className='fixed top-0 left-0 z-50 w-screen max-w-[100vw] px-4 sm:px-6 md:px-12 py-6'>
			<div className='flex w-full items-center justify-between'>
				<div className='flex md:flex-nowrap gap-2.5 shrink-0'>
					<Mark />
					<Link href={'/'}>Aplyra</Link>
				</div>

				{userLoggedIn ? (
					<div className='hidden md:flex items-center gap-20'>
						<nav className='px-10 py-2 rounded-3xl border border-black/[0.07] bg-black/[0.03] dark:border-white/10 dark:bg-[#FFFFFF0D] backdrop-blur-md z-10'>
							<ul className='flex flex-col md:flex-row gap-10'>
								{links.map(({ text, route }, index) => (
									<li
										key={index}
										className={clsx(
											'px-5 py-0.5 rounded-2xl text-center text-[13px]',
											pathname === route
												? 'bg-white shadow-sm text-black dark:bg-white/10 dark:text-white dark:shadow-none backdrop-blur-md'
												: 'text-black/55 dark:text-white/70',
										)}>
										<Link href={route}>{text}</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className='flex items-center gap-5 px-10 py-2 rounded-3xl border border-black/[0.07] bg-black/[0.03] dark:border-white/10 dark:bg-white/5 backdrop-blur-md z-10'>
							<p>
								Welcome, {username.slice(0, 5) ?? 'Username'}...
							</p>
							<Button onClick={signUserOut} disabled={isLoading}>
								Sign Out
							</Button>
						</div>
					</div>
				) : (
					<nav className='hidden md:block p-1.5 rounded-3xl bg-black/[0.03] dark:bg-[#FFFFFF0D] border border-black/[0.07] dark:border-white/10 backdrop-blur-md z-10'>
						<ul className='flex flex-row gap-1'>
							{links.map(({ text, route }, index) => (
								<li
									key={index}
									className={clsx(
										'px-4.5 py-2 rounded-[18px] text-[13px] transition-all duration-200 ease-in-out',
										selectedNavIndex === index
											? 'bg-white shadow-sm dark:bg-[#FFFFFF14] dark:shadow-none backdrop-blur-md'
											: '',
									)}
									onClick={() => {
										setSelectedNavIndex(index);
										if (selectedNavIndex === 1) {
											scrollIntoView();
										}
									}}>
									<Link
										href={route}
										className={clsx(
											selectedNavIndex === index
												? 'text-black dark:text-white'
												: 'text-black/55 dark:text-white/70',
										)}>
										{text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				)}
				<Button
					text='Join Waitlist'
					className='shrink-0 px-5 h-9 bg-brand-purple rounded-2xl text-[13px] font-normal text-white dark:text-black'
					redirectTo='#more-information'
				/>
			</div>
		</div>
	);
}
