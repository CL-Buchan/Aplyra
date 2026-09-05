import Wrapper from '@/app/components/Wrapper';

function SkeletonRow() {
	return (
		<tr>
			<td>
				<div className='flex items-center gap-3'>
					<div className='size-9 shrink-0 animate-pulse rounded-lg bg-white/10' />
					<div className='flex flex-col gap-1.5'>
						<div className='h-4 w-32 animate-pulse rounded bg-white/10' />
						<div className='h-3 w-24 animate-pulse rounded bg-white/10' />
					</div>
				</div>
			</td>
			<td>
				<div className='h-5 w-16 animate-pulse rounded-xl bg-white/10' />
			</td>
			<td>
				<div className='h-4 w-20 animate-pulse rounded bg-white/10' />
			</td>
			<td>
				<div className='size-8 animate-pulse rounded-lg bg-white/10' />
			</td>
		</tr>
	);
}

export default function Loading() {
	return (
		<Wrapper>
			<div className='w-full h-screen flex flex-col flex-1 items-start justify-center font-sans'>
				{/* Top bar */}
				<div className='w-full h-16 py-4 px-8 flex justify-between items-center border-b border-b-white/10 glass'>
					<div className='relative w-[320px]'>
						<div className='h-9 w-full animate-pulse rounded-lg bg-white/10' />
					</div>
					<div className='flex flex-row items-center gap-2.5'>
						<div className='size-7 animate-pulse rounded-full bg-white/10' />
						<div className='h-4 w-24 animate-pulse rounded bg-white/10' />
					</div>
				</div>

				<main className='relative w-full px-10 py-8 flex-1 flex flex-col justify-start items-start gap-6 overflow-y-auto'>
					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<div className='h-7 w-32 animate-pulse rounded bg-white/10' />
							<div className='h-5 w-20 animate-pulse rounded-lg bg-white/10' />
						</div>
					</div>

					<div className='w-full flex justify-between items-center'>
						<div className='flex items-center gap-2'>
							<div className='h-8 w-24 animate-pulse rounded-lg bg-white/10' />
							<div className='h-8 w-28 animate-pulse rounded-lg bg-white/10' />
						</div>
						<div className='h-8 w-36 animate-pulse rounded-lg bg-white/10' />
					</div>

					<div className='table-wrap w-full'>
						<table className='w-full table-fixed'>
							<colgroup>
								<col className='w-1/2' />
								<col className='w-1/6' />
								<col className='w-1/6' />
								<col className='w-16' />
							</colgroup>

							<thead>
								<tr>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Company &amp; Role
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Status
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Date Added
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Actions
									</th>
								</tr>
							</thead>

							<tbody>
								<SkeletonRow />
								<SkeletonRow />
								<SkeletonRow />
								<SkeletonRow />
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
