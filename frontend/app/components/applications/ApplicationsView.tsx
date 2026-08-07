'use client';

import ApplicationCard from '@/app/components/applications/ApplicationCard';
import ApplicationModal from '@/app/components/applications/ApplicationModal';
import Button from '@/app/components/ui/Button';
import Pill from '@/app/components/ui/Pill';
import { ApplicationWithCompany } from '@/app/types/application.types';
import { useState } from 'react';

export default function ApplicationsView({
	applications,
}: {
	applications: ApplicationWithCompany[];
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const jobCount = applications.length;

	return (
		<>
			<div>
				<Pill text={`${jobCount} ${jobCount === 1 ? 'Job' : 'Jobs'}`} />
				<h2>Your Applications</h2>
			</div>

			<div className='w-full flex flex-col justify-start items-end gap-10'>
				<Button onClick={() => setModalOpen(true)}>Add job</Button>

				{applications.length === 0 ? (
					<div className='w-full flex flex-col items-center gap-6 rounded-2xl border border-black/10 bg-white/60 p-10 dark:border-white/15 dark:bg-white/5'>
						<p className='text-muted'>
							No applications yet. Upload a document or add your
							first job to start tracking.
						</p>
						<Button
							variant='secondary'
							redirectTo='/dashboard/upload'
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

			<ApplicationModal
				onClose={() => setModalOpen(!modalOpen)}
				isOpen={modalOpen}
			/>
		</>
	);
}
