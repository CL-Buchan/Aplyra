'use client';

import { invertTextColour } from '@/app/helpers/invertTextColour';
import { ButtonProps } from '@/app/types/global.types';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function Button({
	redirectTo,
	text,
	type = 'button',
	children,
	variant = 'primary',
	onClick,
	className,
	disabled = false,
	isLoading,
}: ButtonProps) {
	const [isDarkMode, setDarkMode] = useState(false);

	// Checks if darkmode is present
	useEffect(() => {
		const checkDarkMode = () => {
			const darkModeEnabled = window.matchMedia(
				'(prefers-color-scheme: dark)',
			).matches;
			setDarkMode(darkModeEnabled);
		};

		checkDarkMode();
	}, []);

	let style = '';
	if (!className) {
		switch (variant) {
			case 'none':
				style = '';
				break;
			case 'primary':
				style =
					'bg-[#000000]/5 hover:bg-black/10 dark:bg-[#FFFFFF] dark:hover:bg-[#FFFFFF]/80 text-[#000000]';
				break;
			case 'secondary':
				style =
					'bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 border border-[#FFFFFF]/10 text-[#888888]';
				break;
			default:
				break;
		}
	}

	// Get brand colour and invert text colouring accordingly
	const brandColours: Record<string, string> = {
		'brand-purple': '#7c5cfc',
		'bttn-primary-bg': '#FFFFFF',
		'bttn-ghost-bg': '#1A1A1A',
	};

	const bgKey = className?.split('bg-')[1] ?? '';
	const brandHex = brandColours[bgKey];
	const textColour = brandHex
		? brandHex.split('#')[1].split(']')[0]
		: isDarkMode
			? 'FFFFFF'
			: '000000';
	const invertedTextColour = invertTextColour(textColour, 100);
	const bgColour = isDarkMode
		? style?.split('dark:bg-[')[1]?.split(']')[0].replace('#', '')
		: style?.split('bg-[')[1]?.split(']')[0].replace('#', '');
	const hex = className ? brandHex : bgColour;

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				`w-fit min-h-8 px-4 rounded-[7px] tracking-tight transition-colors duration-300 ease-in-out`,
				disabled && 'opacity-50 cursor-not-allowed',
				className ? className : style,
			)}>
			{isLoading ? (
				<LoadingSpinner />
			) : children ? (
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
