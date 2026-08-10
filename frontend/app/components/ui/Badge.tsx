'use client';

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
	return (
		<div
			className={clsx(
				'inline-flex items-center gap-2 py-1.5 px-3.5 rounded-[20px] border',
				className,
				bgColour === 'blue'
					? 'bg-brand-purple/10 border-brand-purple/25 dark:bg-brand-purple/15 dark:border-brand-purple/30'
					: 'bg-black/5 border-black/15 dark:bg-white/10 dark:border-white/15',
			)}>
			{indicator && (
				<span className='w-1.5 h-1.5 rounded-full bg-[#7C5CFC] animate-pulse' />
			)}
			<span
				className={clsx(
					'text-xs font-medium',
					bgColour === 'blue'
						? 'text-[#7C5CFC] dark:text-brand-purple/90'
						: 'text-black/70 dark:text-white/70',
				)}>
				{children}
			</span>
		</div>
	);
}
