'use client';

import { invertTextColour } from '@/app/helpers/invertTextColour';
import { ButtonProps } from '@/app/types/types';
import clsx from 'clsx';
import { convertServerPatchToFullTree } from 'next/dist/client/components/segment-cache/navigation';
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
				'bg-black/5 hover:bg-black/10 dark:bg-[#FFFFFF] dark:hover:bg-[#FFFFFF]/80 text-[#000000]';
			break;
		case 'secondary':
			style =
				'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 border border-[#FFFFFF]/10 text-[#888888]';
			break;
		default:
			break;
	}

	// Get brand colour and invert text colouring accordingly
	const brandColours: Record<string, string> = {
		'brand-blue': '#0000ff',
		'bttn-primary-bg': '#FFFFFF',
		'bttn-ghost-bg': '#1A1A1A',
	};

	useEffect(() => {
		isDarkMode.current = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
	}, []);

	const bgKey = className?.split('bg-')[1] ?? '';
	const brandHex = brandColours[bgKey];
	const textColour = brandHex
		? brandHex.split('#')[1].split(']')[0]
		: isDarkMode
			? 'FFFFFF'
			: '000000';
	const invertedTextColour = invertTextColour(textColour, 100);

	return (
		<button
			type={type}
			onClick={onClick}
			className={clsx(
				`w-fit min-h-[32px] px-[16px] rounded-[7px] tracking-tight transition-colors duration-300 ease-in-out`,
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
