'use client';

import { hexToRgb } from '@/app/helpers/hexToRgb';
import { invertTextColour } from '@/app/helpers/invertTextColour';
import { PillProps } from '@/app/types/global.types';
import { useEffect, useRef, useState } from 'react';

export default function Pill({
	text = 'Default',
	variant = 'primary',
	styles: { hexColour = 'FFFFFF', opacity = '25%' } = {},
}: PillProps) {
	const [formattedWords, setFormattedWords] = useState<string[]>([]);
	const [newText, setNewText] = useState('');
	const runTimes = useRef(0);

	// Clean text before any methods
	text = text.trim();

	const { r, g, b } = hexToRgb(hexColour);
	const opacityValue = Number(opacity.trim().replace('%', ''));
	const textColour = invertTextColour(hexColour, opacityValue);
	const { r: borderR, g: borderG, b: borderB } = hexToRgb(textColour);

	// Capitalise the start of each letter - run effect once on render
	useEffect(() => {
		const formatWords = () => {
			const words = text.split(' ');

			if (runTimes.current === 0) {
				for (const text of words) {
					const wordLen = text.length;
					const capitalisedWord =
						text.slice(0, 1).toUpperCase() +
						text.slice(1, wordLen).toLowerCase();
					setFormattedWords((prev) => [...prev, capitalisedWord]);
				}
			}

			runTimes.current = 1;
		};

		formatWords();
	}, []);

	useEffect(() => {
		const setText = () => {
			const formattedWordStr = formattedWords.join(' ');
			setNewText(formattedWordStr);
		};

		setText();
	}, [formattedWords]);

	let style = '';
	switch (variant) {
		case 'primary':
			style =
				'bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20';
			break;
		case 'secondary':
			style = 'bg-black dark:bg-white';
			break;
		default:
			break;
	}

	return (
		<div
			style={{
				color: `#${textColour}`,
				backgroundColor: `rgba(${r}, ${g}, ${b}, 0.3)`,
				borderColor: `rgba(${borderR}, ${borderG}, ${borderB}, 0.5)`,
			}}
			className={`max-h-fit max-w-fit py-px px-5 flex items-center rounded-xl tracking-tight ${style}`}>
			{newText}
		</div>
	);
}
