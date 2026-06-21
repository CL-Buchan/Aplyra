import { invertTextColour } from '@/app/helpers/invertTextColour';
import { PillProps } from '@/app/types/types';

export default function Pill({
	text = 'Default',
	variant = 'primary',
	styles: { hexColour = 'FFFFFF', opacity = '25%' } = {},
}: PillProps) {
	const styleMap: Record<string, { bg: string; border: string }> = {
		'5%': { bg: '0D', border: '33' },
		'10%': { bg: '1A', border: '4D' },
		'25%': { bg: '40', border: '66' },
		'50%': { bg: '80', border: 'B3' },
		'100%': { bg: 'FF', border: 'FF' },
	};

	const { bg: bgOpacity, border: borderOpacity } = styleMap[opacity] ?? {
		bg: 'FF',
		border: 'FF',
	};

	const opacityValue = Number(opacity.trim().replace('%', ''));
	const textColour = invertTextColour(hexColour, opacityValue);

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
				backgroundColor: `#${hexColour}${bgOpacity}`,
				borderColor: `#${hexColour}${borderOpacity}`,
			}}
			className={`max-w-fit py-px px-5 rounded-xl uppercase tracking-tight ${style}`}>
			{text}
		</div>
	);
}
