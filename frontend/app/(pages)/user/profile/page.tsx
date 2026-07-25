'use client';

import ProfileEditForm from '@/app/components/profile/ProfileEditForm';
import Pill from '@/app/components/ui/Pill';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/client';
import { Tables } from '@/app/types/database.types';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function UserProfile() {
	const [authUser, setAuthUser] = useState<User>();
	const [updatedUserData, setUpdatedUserData] = useState<Tables<'users'>>({
		id: '',
		name: null,
		email: null,
		created_at: null,
	});

	useEffect(() => {
		const getUser = async () => {
			const supabase = createClient();
			const { data, error } = await supabase.auth.getUser();
			if (error) throw new Error('Cannot fetch user details');

			setAuthUser(data.user);

			const { data: userRow, error: userRowError } = await supabase
				.from('users')
				.select('*')
				.eq('id', data.user.id)
				.single();
			if (userRowError) throw new Error('Cannot fetch user profile');

			setUpdatedUserData(userRow);
		};

		getUser();
	}, []);

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div>
						<Pill text='Account' />
						<h2>Profile</h2>
					</div>

					<div className='w-full flex justify-center items-center'>
						<ProfileEditForm
							user={updatedUserData}
							setUser={setUpdatedUserData}
						/>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
