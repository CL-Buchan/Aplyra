'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
	const links = [
		{ text: 'Home', route: '/' },
		{ text: 'Upload', route: '/upload' },
		{ text: 'Applications', route: '/applications' },
		{ text: 'Login', route: '/auth/login' },
		{ text: 'Sign Up', route: '/auth/sign-up' },
	];

	const pathname = usePathname();

	return (
		<div className='relative mt-10 w-full flex justify-center'>
			<nav className='fixed px-10 py-1.5 rounded-2xl backdrop-blur-md z-10'>
				<ul className='flex flex-row gap-10'>
					{links.map(({ text, route }, index) => (
						<li
							key={index}
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
