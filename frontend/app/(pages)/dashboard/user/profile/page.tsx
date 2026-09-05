import ProfileEditForm from '@/app/components/profile/ProfileEditForm';
import Pill from '@/app/components/ui/Pill';
import Wrapper from '@/app/components/Wrapper';
import { getCurrentUser } from '@/app/services/auth/getCurrentUser';
import { createClient } from '@/app/services/supabase/server';
import { redirect } from 'next/navigation';

export default async function UserProfile() {
	const user = await getCurrentUser();

	if (!user) redirect('/auth/login');

	const supabase = await createClient();
	const { data: userRow, error: userRowError } = await supabase
		.from('users')
		.select('*')
		.eq('id', user.id)
		.single();

	if (userRowError) throw new Error('Cannot fetch user profile');

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6 overflow-y-scroll'>
					<div>
						<Pill text='Account' />
						<h2>Profile</h2>
					</div>

					<div className='w-full flex flex-col justify-center items-end gap-6'>
						<p className='text-muted text-sm'>
							Last updated: {userRow.created_at}
						</p>

						<div className='w-full flex justify-center items-center'>
							<ProfileEditForm user={userRow} />
						</div>
					</div>

					<div className='w-full flex justify-center'>
						<p className='text-muted text-center text-sm'>
							Stuck? <br />
							Simply change your details by entering your new
							username or email.
						</p>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
