import LetterViewer from '@/app/components/letters/LetterViewer';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/server';
import { notFound } from 'next/navigation';

export default async function LetterPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const letterId = Number(id);
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) notFound();

	const { data: letter, error } = await supabase
		.from('letters')
		.select('*')
		.eq('id', letterId)
		.eq('user_id', user.id)
		.single();

	if (error || !letter) notFound();

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div>
						<h2 className='tracking-tighter'>
							Your Cover Letter
						</h2>
						<p>
							Sit tight, your generated letter will appear below
							once it&apos;s ready.
						</p>
					</div>

					<LetterViewer letter={letter} />
				</main>
			</div>
		</Wrapper>
	);
}
