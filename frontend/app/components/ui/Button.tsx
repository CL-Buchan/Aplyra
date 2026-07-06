'use client';

import { invertTextColour } from '@/app/helpers/invertTextColour';
import { ButtonProps } from '@/app/types/types';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { invertColour } from '@/app/helpers/invertColour';

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
	const [spinnerColour, setSpinnerColour] = useState('');

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
		'brand-blue': '#0000ff',
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
	console.log('style', style);
	const bgColour = isDarkMode
		? style?.split('dark:bg-[')[1]?.split(']')[0].replace('#', '')
		: style?.split('bg-[')[1]?.split(']')[0].replace('#', '');
	console.log('bg colour:', bgColour);
	console.log(className ? brandHex : bgColour);
	const hex = className ? brandHex : bgColour;
	console.log('hex value:', hex);

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={clsx(
				`w-fit min-h-[32px] px-[16px] rounded-[7px] tracking-tight transition-colors duration-300 ease-in-out`,
				disabled && 'opacity-50 cursor-not-allowed',
				className ? className : style,
			)}>
			{isLoading ? (
				<LoadingSpinner colour={spinnerColour} />
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
