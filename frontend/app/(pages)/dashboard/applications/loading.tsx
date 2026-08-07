import SkeletonCard from '@/app/components/ui/SkeletonCard';
import Wrapper from '@/app/components/Wrapper';

export default function Loading() {
	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div>
						<div className='h-6 w-16 animate-pulse rounded-xl bg-black/10 dark:bg-white/10' />
						<h2 className='tracking-tighter'>Your Applications</h2>
					</div>

					<div className='w-full flex flex-col justify-start items-end gap-10'>
						<div className='h-8 w-24 animate-pulse rounded-[7px] bg-black/10 dark:bg-white/10' />

						<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
							<SkeletonCard />
						</div>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
