'use client';

import ApplicationCard from '@/app/components/applications/ApplicationCard';
import ApplicationModal from '@/app/components/applications/ApplicationModal';
import Button from '@/app/components/ui/Button';
import Pill from '@/app/components/ui/Pill';
import Wrapper from '@/app/components/Wrapper';
import { createClient } from '@/app/services/supabase/client';
import { ApplicationWithCompany } from '@/app/types/applications';
import { useEffect, useState } from 'react';

export default function Applications() {
	const [applications, setApplications] = useState<ApplicationWithCompany[]>(
		[],
	);
	const [jobCount, setJobCount] = useState(0);
	const [modalOpen, setModalOpen] = useState(false);
	const [error, setError] = useState('');

	const supabase = createClient();

	useEffect(() => {
		const getApplications = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user)
				return setError('You must be logged in to view applications.');

			const { data, error } = await supabase
				.from('applications')
				.select('*, company:company_id (name, location)')
				.eq('user_id', user.id)
				.order('applied_at', { ascending: false });

			if (error) return setError('Could not fetch applications.');

			setApplications(data);
			setJobCount(applications.length);
		};

		getApplications();
	}, []);

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans bg-zinc-50 dark:bg-black'>
				<main className='relative max-w-200 py-25 flex flex-col justify-start items-start gap-[50px] w-full px-6'>
					<div>
						<Pill
							text={`${jobCount} ${jobCount === 1 ? 'Job' : 'Jobs'}`}
						/>
						<h2>Your Applications</h2>
					</div>

					<div className='w-full flex flex-col justify-start items-end gap-[14px]'>
						<Button onClick={() => setModalOpen(true)}>
							Add job
						</Button>

						{applications.length === 0 ? (
							<div className='w-full flex flex-col items-center gap-6 rounded-2xl border border-black/10 bg-white/60 p-10 dark:border-white/15 dark:bg-white/5'>
								<p className='text-muted'>
									No applications yet. Upload a document or
									add your first job to start tracking.
								</p>
								<Button
									variant='secondary'
									redirectTo='/upload'
									text='Upload a document'
								/>
							</div>
						) : (
							<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
								{applications.map((application) => (
									<ApplicationCard
										key={application.id}
										application={application}
									/>
								))}
							</div>
						)}
					</div>

					{/* {error && (
					<p className='w-full text-red-500 text-center'>{error}</p>
				)} */}
				</main>

				<ApplicationModal
					onClose={() => setModalOpen(!modalOpen)}
					isOpen={modalOpen}
				/>
			</div>
		</Wrapper>
	);
}
