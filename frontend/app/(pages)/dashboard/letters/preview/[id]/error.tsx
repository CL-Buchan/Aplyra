'use client';

import BackButtonNav from '@/app/components/ui/BackButton';

export default function Error() {
	return (
		<div className='flex w-full flex-col items-center justify-center gap-6 px-6 py-25'>
			<p className='text-red-500'>
				Something went wrong loading this document.
			</p>
			<BackButtonNav route='/dashboard/applications' />
		</div>
	);
}
