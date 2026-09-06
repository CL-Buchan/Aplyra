import { createClient } from '@/app/services/supabase/server';

const PROFILE_IMAGE_BUCKET = 'profile_images';

export interface ProfileSummary {
	name: string | null;
	profileImageUrl: string | null;
}

/**
 * Resolves the display name and public profile image URL for a user in a
 * single query. Safe to call from any Server Component.
 */
export async function getProfileSummary(userId: string): Promise<ProfileSummary> {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from('users')
		.select('name, profile_image')
		.eq('id', userId)
		.single();

	if (error || !data) return { name: null, profileImageUrl: null };

	if (!data.profile_image) return { name: data.name, profileImageUrl: null };

	const { data: publicUrlData } = supabase.storage
		.from(PROFILE_IMAGE_BUCKET)
		.getPublicUrl(data.profile_image);

	return { name: data.name, profileImageUrl: publicUrlData.publicUrl };
}
