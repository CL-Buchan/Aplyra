'use client';

import { linkLetterApplication } from '@/app/(pages)/dashboard/letters/actions';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/client';
import { Tables } from '@/app/types/database.types';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';

type ApplicationOption = Pick<Tables<'applications'>, 'id' | 'role'> & {
	company: Pick<Tables<'company'>, 'name'> | null;
};

export default function Letters() {
	const [selectedRow, setSelectedRow] = useState(0);
	const [letters, setLetters] = useState<Tables<'letters'>[]>([]);
	const [applications, setApplications] = useState<ApplicationOption[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) redirect('/auth/login');

			const [
				{ data: letters, error: lettersError },
				{ data: applications, error: applicationsError },
			] = await Promise.all([
				supabase.from('letters').select('*').eq('user_id', user.id),
				supabase
					.from('applications')
					.select('id, role, company:company_id (name)')
					.eq('user_id', user.id),
			]);

			if (lettersError) throw new Error('Cannot fetch letters');
			if (applicationsError) throw new Error('Cannot fetch applications');

			setLetters(letters ?? []);
			setApplications(
				(applications ?? []) as unknown as ApplicationOption[],
			);
		};

		fetchData();
	}, []);

	const handleLink = async (letterId: number, value: string) => {
		const applicationId = value === '' ? null : Number(value);

		setLetters((prev) =>
			prev.map((letter) =>
				letter.id === letterId
					? { ...letter, application_id: applicationId }
					: letter,
			),
		);

		const result = await linkLetterApplication(letterId, applicationId);

		if (result.success) {
			posthog.capture('letter_application_linked', {
				is_linked: applicationId !== null,
			});
		} else {
			toast.error(result.error ?? 'Failed to link letter');
		}
	};

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-12.5 w-full px-6'>
					<div>
						<h2>Your Cover Letters</h2>
						<p>View your generated cover letters here.</p>
					</div>

					<div className='table-wrap w-full'>
						<table className='w-full table-fixed'>
							<colgroup>
								<col className='w-16' /> 
								<col className='w-[calc(33.33%-2rem)]' />
								<col className='w-[calc(33.33%-2rem)]' />
								<col className='w-[calc(33.33%-2rem)]' />
							</colgroup>

							<thead>
								<tr>
									<th className='text-left'>ID</th>
									<th className='text-left'>Application</th>
									<th className='text-left'>Job</th>
									<th className='text-left'>Word Count</th>
								</tr>
							</thead>

							<tbody>
								{letters.map(
									({
										id,
										application_id,
										job_description,
										letter,
									}) => (
										<tr key={id}>
											<td>{id}</td>
											<td>
												<select
													value={application_id ?? ''}
													onChange={(event) =>
														handleLink(
															id,
															event.target.value,
														)
													}
													className='w-full rounded-lg border border-white/15 bg-transparent px-2 py-1 text-sm'>
													<option value=''>
														Not linked
													</option>
													{applications.map(
														(application) => (
															<option
																key={
																	application.id
																}
																value={
																	application.id
																}>
																{application.role ??
																	'Untitled role'}
																{application
																	.company
																	?.name
																	? ` — ${application.company.name}`
																	: ''}
															</option>
														),
													)}
												</select>
											</td>
											<td className='truncate'>
												{job_description}
											</td>
											<td>{letter?.length}</td>
										</tr>
									),
								)}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
