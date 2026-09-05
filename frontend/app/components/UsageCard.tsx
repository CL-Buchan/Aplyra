export default function UsageCard() {
	const min = 4;
	const max = 10;
	return (
		<div className='w-full min-h-25 py-5 px-2.5 shrink-0 flex flex-col justify-between bg-white/5 border border-white/20 rounded-xl'>
			<div className='w-full flex flex-row justify-between items-end'>
				<p className='text-sm'>Usage</p>
				<p className='py-px px-1.25 text-sm bg-purple-500/25 text-purple-500 uppercase'>
					Pro
				</p>
			</div>
			<div className='flex flex-col gap-0'>
				<div className='w-full flex flex-row justify-between items-end'>
					<p className='text-sm text-muted'>Monthly limit</p>
					<p className='text-sm'>
						{min} / {max}
					</p>
				</div>
				<div className='relative'>
					<div className='absolute w-full h-1 rounded-xl bg-muted' />
					<div className='absolute w-[40%] h-1 rounded-xl bg-purple-500' />
				</div>
			</div>
		</div>
	);
}
