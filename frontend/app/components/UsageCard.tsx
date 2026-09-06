import clsx from 'clsx';
import { UsageCardProps } from '../types/global.types';

export default function UsageCard({
	min,
	max,
	isProfileMenuOpen,
}: UsageCardProps) {
	const usedPercent =
		max > 0 ? Math.min(100, Math.max(0, (min / max) * 100)) : 0;
	return (
		<div
			className={clsx(
				'w-full min-h-25 py-5 px-2.5 shrink-0 flex flex-col gap-5 justify-between bg-white/5 border border-white/20 rounded-xl transition-transform duration-300 ease-out',
				isProfileMenuOpen ? '-translate-y-10' : 'translate-y-0',
			)}>
			<div className='w-full flex flex-row justify-between items-end'>
				<p className='text-sm'>Usage</p>
				<p className='py-px px-1.25 font-bold text-sm bg-purple-500/25 text-purple-500 uppercase'>
					Pro
				</p>
			</div>

			<div className='flex flex-col gap-1.25'>
				<div className='w-full flex flex-row justify-between items-end'>
					<p className='text-sm text-muted'>Monthly limit</p>
					<p className='text-sm'>
						{min} / {max}
					</p>
				</div>

				<div className='relative w-full h-1'>
					<div className='absolute inset-0 rounded-xl bg-muted' />
					<div
						className='absolute inset-y-0 left-0 rounded-xl bg-purple-500'
						style={{ width: `${usedPercent}%` }}
					/>
				</div>
			</div>
		</div>
	);
}
