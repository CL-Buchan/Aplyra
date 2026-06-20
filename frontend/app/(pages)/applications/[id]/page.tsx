import Card from '@/app/components/ui/Card';
import { createClient } from '@/app/services/supabase/server';
import { Tables } from '@/app/types/database.types';

type Application = Tables<'applications'>;

export default async function Edit({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('applications')
		.select('*')
		.eq('id', id)
		.single();

	const application = data as Application;

	if (error) throw new Error('Could not fetch application by id');
	if (!application) throw new Error('No applications were returned');

	return (
		<div className='w-full flex flex-col flex-1 items-center justify-center font-sans bg-zinc-50 dark:bg-black'>
			<main className='max-w-200 py-25 flex flex-col justify-start items-start gap-25'>
				<Card>
					<div>
						<p className='text-xs font-mono tracking-widest uppercase'>
							{application.id}
						</p>
						<p className='font-semibold'>{application.role}</p>
					</div>
					<div></div>
				</Card>
			</main>
		</div>
	);
}
