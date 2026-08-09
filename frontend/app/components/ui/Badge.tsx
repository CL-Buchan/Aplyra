import clsx from 'clsx';

export function Badge({
	children,
	className,
	bgColour = 'blue',
	indicator = true,
}: {
	children: React.ReactNode;
	className?: string;
	bgColour?: 'blue' | 'grey';
	indicator?: boolean;
}) {
	let backgroundColour = '';

	switch (bgColour) {
		case 'grey':
			backgroundColour = '#FFFFFF';
			break;
		default:
			backgroundColour = 'brand-blue';
			break;
	}

	return (
		<div
			className={clsx(
				'inline-flex items-center gap-2 py-1.5 px-3.5 rounded-[20px] border',
				className,
				bgColour === 'blue'
					? `bg-${backgroundColour}/12 border-brand-blue/35`
					: `bg-[${backgroundColour}] border-[#FFFFFF1A]`,
			)}>
			{indicator && (
				<span className='w-1.5 h-1.5 rounded-full bg-[#5C8FF7] animate-pulse' />
			)}
			<span className='text-xs font-medium text-[#8fb0f9]'>
				{children}
			</span>
		</div>
	);
}
