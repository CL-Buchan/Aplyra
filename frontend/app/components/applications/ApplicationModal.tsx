'use client';

import { useState } from 'react';
import { JobApplication, ModalProps } from '@/app/types/global.types';
import Indicator from '../Indicator';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { createClient } from '@/app/services/supabase/client';
import posthog from 'posthog-js';
import { toast } from 'sonner';

const REQUIRED_FIELDS: (keyof JobApplication)[] = [
	'role',
	'company',
	'location',
	'status',
	'appliedDate',
	'closingDate',
	'jobDescription',
];

export default function ApplicationModal({ isOpen, onClose }: ModalProps) {
	const [application, setApplication] = useState<JobApplication>({});
	const [applications, setApplications] = useState<JobApplication[]>([]);
	const [isLoading, setLoading] = useState(false);

	const isInputsFilled = REQUIRED_FIELDS.every((field) => {
		const value = application[field];
		return value !== undefined && value !== null && value !== '';
	});

	function handleAddJob() {
		if (!isInputsFilled) return;
		setApplications((prev) => [...prev, application]);
		setApplication({});
	}

	async function submitApplications() {
		if (applications.length === 0 || isLoading) return;

		setLoading(true);
		const supabase = createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			setLoading(false);
			return console.error('You must be logged in to add applications.');
		}

		const { data: company_names, error: companyError } = await supabase
			.from('company')
			.select('name')
			.eq('name', application.company || '');

		if (companyError) return console.error();
		if (!company_names || company_names.length === 0)
			return console.error('Company name is not found.');

		toast.error('Company name is not found.');

		const { error } = await supabase
			.from('applications')
			.insert(
				applications.map((application: JobApplication) => ({
					user_id: user.id,
					role: application.role,
					company_id: 0,
					applied_at: application.appliedDate,
					closing_date: application.closingDate,
					closed:
						Date.now() >
						new Date(String(application.closingDate)).getTime(),
					status: application.status,
					job_description: application.jobDescription,
				})),
			);
		setLoading(false);

		if (error) return console.error(error);

		posthog.capture('application_created', {
			application_count: applications.length,
		});
		toast.success('Your application was successfully created!');
		setApplications([]);
		onClose();
	}

	return (
		<Modal
			header={{
				title: 'Add Job',
				description: 'Track a new job application',
			}}
			footer={{
				element: isInputsFilled ? (
					<Indicator colour='grey' />
				) : (
					<Indicator colour='red' />
				),
				buttons: [
					{ text: 'Cancel', onClick: onClose },
					{ text: 'Add Job', onClick: handleAddJob },
					{
						text: `Submit (${applications.length})`,
						onClick: submitApplications,
						disabled: applications.length === 0 || isLoading,
					},
				],
			}}
			onClose={onClose}
			isOpen={isOpen}
			isInputsFilled={isInputsFilled}
			isLoading={isLoading}>
			<div className='bg-[#151515] flex flex-col gap-[14px]'>
				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label htmlFor='role'>Role</label>
					<Input
						type='text'
						name='role'
						placeholder='What role is the job?'
						value={application.role ?? ''}
						onChange={(e) =>
							setApplication((prev) => ({
								...prev,
								role: e.target.value,
							}))
						}
					/>
				</div>

				<div className='w-full flex items-start gap-[12px]'>
					<div className='flex flex-col items-start gap-[6px]'>
						<label htmlFor='company'>Company</label>
						<Input
							name='company'
							type='text'
							placeholder="What's the company called?"
							value={application.company ?? ''}
							onChange={(e) =>
								setApplication((prev) => ({
									...prev,
									company: e.target.value,
								}))
							}
						/>
					</div>
					<div className='flex flex-col items-start gap-[6px]'>
						<label htmlFor='location'>Location</label>
						<Input
							name='location'
							type='text'
							placeholder='Where is the job location?'
							value={application.location ?? ''}
							onChange={(e) =>
								setApplication((prev) => ({
									...prev,
									location: e.target.value,
								}))
							}
						/>
					</div>
				</div>

				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label htmlFor='status'>Status</label>
					<Input
						name='status'
						type='text'
						value={application.status ?? ''}
						onChange={(e) =>
							setApplication((prev) => ({
								...prev,
								status: e.target.value,
							}))
						}
					/>
				</div>

				<div className='w-full flex items-start gap-[12px]'>
					<div className='flex-1 flex flex-col items-start gap-[6px]'>
						<label htmlFor='applied_date'>Applied Date</label>
						<Input
							name='applied_date'
							type='date'
							placeholder='Applied at?'
							value={String(application.appliedDate ?? '')}
							onChange={(e) =>
								setApplication((prev) => ({
									...prev,
									appliedDate: e.target.value,
								}))
							}
						/>
					</div>
					<div className='flex-1 flex flex-col items-start gap-[6px]'>
						<label htmlFor='closing_date'>Closing Date</label>
						<Input
							name='closing_date'
							type='date'
							placeholder='Closing date?'
							value={String(application.closingDate ?? '')}
							onChange={(e) =>
								setApplication((prev) => ({
									...prev,
									closingDate: e.target.value,
								}))
							}
						/>
					</div>
				</div>

				<div className='w-full flex flex-col items-start gap-[6px]'>
					<label htmlFor='job_description'>Job Description</label>
					<Input
						name='job_description'
						type='textarea'
						placeholder='About the job...'
						value={application.jobDescription ?? ''}
						onChange={(e) =>
							setApplication((prev) => ({
								...prev,
								jobDescription: e.target.value,
							}))
						}
					/>
				</div>
			</div>
		</Modal>
	);
}
