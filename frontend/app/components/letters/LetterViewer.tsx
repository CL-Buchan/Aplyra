'use client';

import LoadingSpinner from '@/app/components/ui/LoadingSpinner';
import { createClient } from '@/app/services/supabase/client';
import { Tables } from '@/app/types/database.types';
import { useEffect, useState } from 'react';

export default function LetterViewer({
	letter: initialLetter,
}: {
	letter: Tables<'letters'>;
}) {
	const [letter, setLetter] = useState(initialLetter);

	useEffect(() => {
		if (letter.status !== 'pending') return;

		const supabase = createClient();

		const interval = setInterval(async () => {
			const { data } = await supabase
				.from('letters')
				.select('*')
				.eq('id', letter.id)
				.single();

			if (data && data.status !== 'pending') {
				setLetter(data);
			}
		}, 2000);

		return () => clearInterval(interval);
	}, [letter.id, letter.status]);

	if (letter.status === 'error') {
		return (
			<div className='w-full flex flex-col items-center gap-4 rounded-2xl border border-black/10 bg-white/60 p-10 dark:border-white/15 dark:bg-white/5'>
				<p className='text-muted'>
					{letter.error ?? 'Something went wrong generating your letter.'}
				</p>
			</div>
		);
	}

	if (letter.status === 'pending') {
		return (
			<div className='w-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-black/10 bg-white/60 p-10 dark:border-white/15 dark:bg-white/5'>
				<LoadingSpinner />
				<p className='text-muted'>Generating your cover letter…</p>
			</div>
		);
	}

	return (
		<iframe
			src={`/api/letters/${letter.id}/pdf`}
			className='w-full h-[80vh] rounded-2xl border border-black/10 dark:border-white/15'
			title='Generated cover letter'
		/>
	);
}
