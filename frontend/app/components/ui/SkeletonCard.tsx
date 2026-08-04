export default function SkeletonCard() {
	return (
		<div className='w-full rounded-2xl border border-l-4 border-black/10 bg-white/60 p-6 dark:border-white/15 dark:bg-white/5'>
			<div className='flex items-start justify-between gap-4'>
				<div className='h-5 w-32 animate-pulse rounded bg-black/10 dark:bg-white/10' />
				<div className='h-5 w-20 animate-pulse rounded-xl bg-black/10 dark:bg-white/10' />
			</div>

			<div className='mt-3 flex flex-col gap-1.5'>
				<div className='h-4 w-40 animate-pulse rounded bg-black/10 dark:bg-white/10' />
				<div className='h-4 w-28 animate-pulse rounded bg-black/10 dark:bg-white/10' />
			</div>

			<div className='mt-4 flex items-center gap-3'>
				<div className='h-3 w-24 animate-pulse rounded bg-black/10 dark:bg-white/10' />
				<div className='h-3 w-32 animate-pulse rounded bg-black/10 dark:bg-white/10' />
			</div>
		</div>
	);
}
