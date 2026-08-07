'use server';

import { createClient } from '@/app/services/supabase/server';
import { revalidatePath } from 'next/cache';

export async function linkLetterApplication(
	letterId: number,
	applicationId: number | null,
): Promise<{ success: boolean; error?: string }> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			success: false,
			error: 'You must be logged in to link a letter.',
		};
	}

	const { data: existing, error: fetchError } = await supabase
		.from('letters')
		.select('id')
		.eq('id', letterId)
		.eq('user_id', user.id)
		.single();

	if (fetchError || !existing) {
		return { success: false, error: 'Letter not found.' };
	}

	if (applicationId !== null) {
		const { data: application, error: applicationError } = await supabase
			.from('applications')
			.select('id')
			.eq('id', applicationId)
			.eq('user_id', user.id)
			.single();

		if (applicationError || !application) {
			return { success: false, error: 'Application not found.' };
		}
	}

	const { error: updateError } = await supabase
		.from('letters')
		.update({ application_id: applicationId })
		.eq('id', letterId)
		.eq('user_id', user.id);

	if (updateError) {
		return { success: false, error: 'Failed to link letter.' };
	}

	revalidatePath('/dashboard/letters');

	return { success: true };
}
