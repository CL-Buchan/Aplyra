import ApplicationsView from '@/app/components/applications/ApplicationsView';
import ProfileBadge from '@/app/components/ProfileBadge';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/server';
import { ApplicationWithCompany } from '@/app/types/application.types';
import { SearchMd } from '@untitledui/icons';
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

	const initialUser = { id: user.id, email: user.email ?? '' };

	return (
		<Wrapper>
			<div className='w-full h-screen flex flex-col flex-1 items-start justify-center font-sans'>
				{/* Top bar */}
				<div className='w-full h-16 py-4 px-8 flex justify-between items-center border-b border-b-white/10 glass'>
					<div className='relative w-[320px]'>
						<SearchMd
							size={20}
							color='var(--color-muted)'
							className='absolute left-3 top-1/2 -translate-y-1/2'
						/>
						<input
							type='text'
							name='search'
							placeholder='Search applications...'
							className='w-full py-2 pl-9 pr-4 border border-white/20 rounded-lg text-sm'
						/>
					</div>
					<div className='flex flex-row items-center gap-2.5'>
						<ProfileBadge initialUser={initialUser} />
					</div>
				</div>

				<main className='relative w-full min-h-0 px-10 py-8 flex-1 flex flex-col justify-start items-start gap-6 overflow-y-auto'>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-col justify-center items-start gap-2'>
							<span className='py-1 px-2.5 text-xs uppercase font-mono bg-white/5 border border-white/20 rounded-lg text-muted'>
								Total: {data.length}
							</span>
							<h2 className='tracking-tighter text-lg'>
								Applications
							</h2>
						</div>
					</div>

					<ApplicationsView
						applications={data as ApplicationWithCompany[]}
					/>
				</main>
			</div>
		</Wrapper>
	);
}
