'use server';

import { createClient } from '@/app/services/supabase/server';
import { ApplicationUpdatePayload } from '@/app/types/application.types';
import { revalidatePath } from 'next/cache';

export async function updateApplication(
	id: number,
	data: ApplicationUpdatePayload,
): Promise<{ success: boolean; error?: string }> {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return {
			success: false,
			error: 'You must be logged in to update an application.',
		};
	}

	const { data: existing, error: fetchError } = await supabase
		.from('applications')
		.select('id')
		.eq('id', id)
		.eq('user_id', user.id)
		.single();

	if (fetchError || !existing) {
		return { success: false, error: 'Application not found.' };
	}

	const { error: updateError } = await supabase
		.from('applications')
		.update({
			status: data.status,
			role: data.role,
			applied_at: data.applied_at,
			closing_date: data.closing_date,
			closed: data.closed,
		})
		.eq('id', id)
		.eq('user_id', user.id);

	if (updateError) {
		return { success: false, error: 'Failed to update application.' };
	}

	revalidatePath('/dashboard/applications');
	revalidatePath(`/dashboard/applications/${id}`);

	return { success: true };
}
