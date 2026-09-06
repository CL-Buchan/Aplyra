'use client';

import { linkLetterApplication } from '@/app/(pages)/dashboard/letters/actions';
import ProfileBadge from '@/app/components/ProfileBadge';
import Wrapper from '@/app/components/Wrapper';
import Pill from '@/app/components/ui/Pill';
import { createClient } from '@/app/services/supabase/client';
import { Tables } from '@/app/types/database.types';
import { AuthenticatedUser, ApplicationOption } from '@/app/types/global.types';
import { FileCode01, Paperclip, Plus } from '@untitledui/icons';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import posthog from 'posthog-js';

const LETTER_STATUS_COLOUR: Record<string, string> = {
	pending: 'D97706',
	complete: '16A34A',
	error: 'DC2626',
};

function formatDateAdded(isoDate: string | null): string {
	if (!isoDate) return 'Unknown date';

	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return 'Unknown date';

	return date.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export default function Letters() {
	const [letters, setLetters] = useState<Tables<'letters'>[]>([]);
	const [applications, setApplications] = useState<ApplicationOption[]>([]);
	const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) redirect('/auth/login');

			setAuthUser({ id: user.id, email: user.email ?? '' });

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
			<div className='w-full h-screen flex flex-col flex-1 items-start justify-center font-sans'>
				{/* Top bar */}
				<div className='w-full h-16 py-4 px-8 flex justify-between items-center border-b border-b-white/10 glass'>
					<div className='relative w-[320px]'>
						<Paperclip
							size={20}
							color='var(--color-muted)'
							className='absolute left-3 top-1/2 -translate-y-1/2'
						/>
						<input
							type='text'
							name='search'
							placeholder='Search letters...'
							className='w-full py-2 pl-9 pr-4 border border-white/20 rounded-lg text-sm'
						/>
					</div>
					<div className='flex flex-row items-center gap-2.5'>
						<ProfileBadge initialUser={authUser} />
					</div>
				</div>

				<main className='relative w-full min-h-0 px-10 py-8 flex-1 flex flex-col justify-start items-start gap-6 overflow-y-auto'>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-col justify-center items-start gap-2'>
							<span className='py-1 px-2.5 text-xs uppercase font-mono bg-white/5 border border-white/20 rounded-lg text-muted'>
								Templates: {letters.length}
							</span>
							<h2 className='tracking-tighter text-lg'>
								Letters
							</h2>
						</div>
					</div>

					<div className='w-full grid grid-cols-1 gap-6 md:grid-cols-3'>
						{letters.map((letterRow) => {
							const {
								id,
								application_id,
								job_description,
								status,
							} = letterRow;
							const linkedApplication = applications.find(
								(application) =>
									application.id === application_id,
							);
							const companyName =
								linkedApplication?.company?.name;
							const role = linkedApplication?.role;

							const title =
								role && companyName
									? `${companyName} ${role}`
									: (role ??
										job_description?.slice(0, 40) ??
										'Untitled letter');
							const subtitle =
								role && companyName
									? `Tailored for ${role} at ${companyName}`
									: (job_description ??
										'No job description provided');

							return (
								<div
									key={id}
									onClick={() =>
										router.push(`/dashboard/letters/${id}`)
									}
									className='cursor-pointer flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition-colors duration-200 ease-in-out'>
									<div className='flex size-9 items-center justify-center rounded-lg bg-white/5 border border-white/10'>
										<FileCode01 className='size-4 opacity-70' />
									</div>

									<div className='min-w-0'>
										<p className='truncate font-medium'>
											{title}
										</p>
										<p className='truncate text-sm text-muted'>
											{subtitle}
										</p>
									</div>

									<div className='flex items-center justify-between gap-2'>
										<Pill
											text={status}
											styles={{
												hexColour:
													LETTER_STATUS_COLOUR[
														status
													] ?? '737373',
												opacity: '25%',
											}}
										/>
										<span className='text-xs text-muted'>
											{formatDateAdded(
												letterRow.created_at,
											)}
										</span>
									</div>

									<select
										value={application_id ?? ''}
										onClick={(event) =>
											event.stopPropagation()
										}
										onChange={(event) =>
											handleLink(id, event.target.value)
										}
										className='w-full rounded-lg border border-white/15 bg-transparent px-2 py-1.5 text-sm'>
										<option value=''>Not linked</option>
										{applications.map((application) => (
											<option
												key={application.id}
												value={application.id}>
												{application.role ??
													'Untitled role'}
												{application.company?.name
													? ` — ${application.company.name}`
													: ''}
											</option>
										))}
									</select>
								</div>
							);
						})}

						<div
							onClick={() => router.push('/dashboard/upload')}
							className='cursor-pointer flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 p-5 min-h-40 text-muted hover:bg-white/5 hover:border-white/25 transition-colors duration-200 ease-in-out'>
							<Plus className='size-5' />
							<p className='text-sm'>New Letter Template</p>
						</div>
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
