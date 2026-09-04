'use server';

import { getCurrentUser } from '@/app/services/auth/getCurrentUser';
import { createClient } from '@/app/services/supabase/server';

export async function startLetterGeneration(
	cvText: string,
	jobDescription: string,
	applicationId?: number,
): Promise<{ id: number; error?: undefined } | { id?: undefined; error: string }> {
	const user = await getCurrentUser();

	if (!user) {
		return { error: 'You must be logged in to generate a cover letter.' };
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from('letters')
		.insert({
			user_id: user.id,
			cv_text: cvText,
			job_description: jobDescription || null,
			application_id: applicationId ?? null,
			status: 'pending',
		})
		.select('id')
		.single();

	if (error || !data) {
		return { error: 'Failed to start letter generation.' };
	}

	return { id: data.id };
}
