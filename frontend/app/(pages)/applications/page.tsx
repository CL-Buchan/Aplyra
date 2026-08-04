import ApplicationsView from '@/app/components/applications/ApplicationsView';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/server';
import { ApplicationWithCompany } from '@/app/types/application.types';
import { redirect } from 'next/navigation';

export default async function Applications() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) redirect('/auth/login');

	const { data, error } = await supabase
		.from('applications')
		.select('*, company:company_id (name, location)')
		.eq('user_id', user.id)
		.order('applied_at', { ascending: false });

	if (error) throw new Error('Could not fetch applications.');

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<ApplicationsView
						applications={data as ApplicationWithCompany[]}
					/>
				</main>
			</div>
		</Wrapper>
	);
}
