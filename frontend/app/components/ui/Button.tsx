'use client';

import { invertTextColour } from '@/app/helpers/invertTextColour';
import { ButtonProps } from '@/app/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Button({
	redirectTo,
	text,
	type = 'button',
	children,
	variant = 'primary',
	onClick,
	className,
}: ButtonProps) {
	const isDarkMode = useRef(false);

	let style = '';
	switch (variant) {
		case 'none':
			style = '';
			break;
		case 'primary':
			style =
				'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20';
			break;
		case 'secondary':
			style =
				'bg-black hover:bg-black/80 text-white dark:bg-white hover:bg-white/80 dark:text-black ';
			break;
		default:
			break;
	}

	// Get brand colour and invert text colouring accordingly
	const brandColours: Record<string, string> = { 'brand-blue': '#0000ff' };

	useEffect(() => {
		isDarkMode.current = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
	}, []);

	const textColour = className
		? brandColours[className?.split('bg-')[1] ?? ''].split('#')[1]
		: isDarkMode
			? 'FFFFFF'
			: '000000';
	const invertedTextColour = invertTextColour(textColour, 100);

	return (
		<button
			type={type}
			onClick={onClick}
			className={clsx(
				`w-fit py-1.25 px-10 rounded-2xl tracking-tight transition-colors duration-300 ease-in-out`,
				className ? className : style,
			)}>
			{children ? (
				children
			) : redirectTo && text ? (
				<Link style={{ color: invertedTextColour }} href={redirectTo}>
					{text}
				</Link>
			) : text ? (
				<p>{text}</p>
			) : (
				'Add text'
			)}
		</button>
	);
}
