'use server';

import { getCurrentUser } from '@/app/services/auth/getCurrentUser';
import { createClient } from '@/app/services/supabase/server';
import { Tables } from '@/app/types/database.types';
import { revalidatePath } from 'next/cache';

export async function updateUserProfile(
	data: Pick<Tables<'users'>, 'name' | 'email'>,
): Promise<{ success: boolean; error?: string }> {
	const user = await getCurrentUser();

	if (!user) {
		return {
			success: false,
			error: 'You must be logged in to update your profile.',
		};
	}

	const supabase = await createClient();

	const { error: updateError } = await supabase
		.from('users')
		.update({ name: data.name, email: data.email })
		.eq('id', user.id);

	if (updateError) {
		return { success: false, error: 'Failed to update profile.' };
	}

	revalidatePath('/dashboard/user/profile');

	return { success: true };
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const PROFILE_IMAGE_BUCKET = 'profile_images';

export async function uploadProfileImage(
	formData: FormData,
): Promise<{ success: boolean; path?: string; error?: string }> {
	const user = await getCurrentUser();

	if (!user) {
		return {
			success: false,
			error: 'You must be logged in to update your profile.',
		};
	}

	const file = formData.get('file');

	if (!(file instanceof File)) {
		return { success: false, error: 'No file was provided.' };
	}

	if (!file.type.startsWith('image/')) {
		return { success: false, error: 'Please choose an image file.' };
	}

	if (file.size > MAX_IMAGE_BYTES) {
		return { success: false, error: 'Image must be under 5MB.' };
	}

	const supabase = await createClient();

	const { data: existingUser } = await supabase
		.from('users')
		.select('profile_image')
		.eq('id', user.id)
		.single();

	const extension = file.type.split('/')[1] ?? 'png';
	const path = `${user.id}/avatar-${Date.now()}.${extension}`;

	const { error: uploadError } = await supabase.storage
		.from(PROFILE_IMAGE_BUCKET)
		.upload(path, file, { contentType: file.type });

	if (uploadError) {
		return { success: false, error: 'Failed to upload image.' };
	}

	const { error: updateError } = await supabase
		.from('users')
		.update({ profile_image: path })
		.eq('id', user.id);

	if (updateError) {
		return { success: false, error: 'Failed to save profile image.' };
	}

	if (existingUser?.profile_image) {
		await supabase.storage
			.from(PROFILE_IMAGE_BUCKET)
			.remove([existingUser.profile_image]);
	}

	revalidatePath('/dashboard/user/profile');

	return { success: true, path };
}
