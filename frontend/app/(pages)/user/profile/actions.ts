'use server';

import { createClient } from '@/app/services/supabase/server';
import { Tables } from '@/app/types/database.types';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(
	data: Pick<Tables<'users'>, 'name' | 'email'>,
): Promise<{ success: boolean; error?: string }> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			success: false,
			error: 'You must be logged in to update your profile.',
		};
	}

	const { error: updateError } = await supabase
		.from('users')
		.update({ name: data.name, email: data.email })
		.eq('id', user.id);

	if (updateError) {
		return { success: false, error: 'Failed to update profile.' };
	}

	revalidatePath('/user/profile');

	return { success: true };
}
