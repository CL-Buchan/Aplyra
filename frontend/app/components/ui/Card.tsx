import { CardProps } from '@/app/types/types';
import clsx from 'clsx';

export default function Card({
	size = 'sm',
	title,
	description,
	children,
	styles: { hexColour = 'FFFFFF', opacity = '5%' } = {},
}: CardProps) {
	const opacityMap: Record<string, { bg: string; border: string }> = {
		'5%': { bg: '0D', border: '33' },
		'10%': { bg: '1A', border: '4D' },
		'25%': { bg: '40', border: '66' },
		'50%': { bg: '80', border: 'B3' },
		'100%': { bg: 'FF', border: 'FF' },
	};

	const { bg: bgOpacity, border: borderOpacity } = opacityMap[opacity] ?? {
		bg: 'FF',
		border: 'FF',
	};

	const sizeMap: Record<string, string> = {
		sm: 'h-[100px]',
		md: 'h-[200px]',
		lg: 'h-[300px]',
	};

	const cardSize = sizeMap[size] ?? sizeMap['sm'];

	return (
		<div
			style={{
				backgroundColor: `#${hexColour}${bgOpacity}`,
				borderColor: `#${hexColour}${borderOpacity}`,
			}}
			className={`w-full p-10 flex flex-col justify-censter items-start gap-2.5 border rounded-2xl opacity-[${opacity}] ${cardSize}`}>
			{title && (
				<div>
					<h1>{title}</h1>
				</div>
			)}

			<div
				className={clsx(
					'flex-1 w-full flex flex-col gap-2.5',
					children
						? 'justify-start items-start'
						: 'justify-center items-center',
				)}>
				{children
					? children
					: description
						? description
						: 'Add content'}
			</div>
		</div>
	);
}
