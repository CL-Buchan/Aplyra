'use client';

import { updateApplication } from '@/app/(pages)/applications/actions';
import Button from '@/app/components/ui/Button';
import { toDateInputValue } from '@/app/helpers/applicationInsights';
import {
	APPLICATION_STATUSES,
	ApplicationUpdatePayload,
	ApplicationWithCompany,
	getStatusConfig,
} from '@/app/types/application.types';
import { useRouter } from 'next/navigation';
import { FormEvent, useState, useTransition } from 'react';
import { toast } from 'sonner';

export default function ApplicationEditForm({
	application,
}: {
	application: ApplicationWithCompany;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [formData, setFormData] = useState<ApplicationUpdatePayload>({
		status: getStatusConfig(application.status).label,
		role: application.role ?? '',
		applied_at: toDateInputValue(application.applied_at) || null,
		closing_date: toDateInputValue(application.closing_date) || null,
		closed: application.closed ?? false,
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		startTransition(async () => {
			const payload: ApplicationUpdatePayload = {
				...formData,
				applied_at: formData.applied_at
					? new Date(formData.applied_at).toISOString()
					: null,
				closing_date: formData.closing_date
					? new Date(formData.closing_date).toISOString()
					: null,
			};

			const result = await updateApplication(application.id, payload);

			if (result.success) {
				toast.success('Application updated');
				router.refresh();
			} else {
				toast.error(result.error ?? 'Failed to update application');
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='flex w-full flex-col gap-6 rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/15 dark:bg-white/5'>
			<div>
				<h3 className='text-lg font-semibold tracking-tight'>
					Manage application
				</h3>
				<p className='mt-1 text-sm text-muted'>
					Update status and key details for this role.
				</p>
			</div>

			<label className='flex flex-col gap-2 text-sm'>
				<span className='font-medium'>Status</span>
				<select
					value={formData.status}
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							status: event.target.value,
						}))
					}
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'>
					{APPLICATION_STATUSES.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</label>

			<label className='flex flex-col gap-2 text-sm'>
				<span className='font-medium'>Role</span>
				<input
					type='text'
					value={formData.role}
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							role: event.target.value,
						}))
					}
					required
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<label className='flex flex-col gap-2 text-sm'>
				<span className='font-medium'>Applied date</span>
				<input
					type='date'
					value={formData.applied_at ?? ''}
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							applied_at: event.target.value || null,
						}))
					}
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<label className='flex flex-col gap-2 text-sm'>
				<span className='font-medium'>Closing date</span>
				<input
					type='date'
					value={formData.closing_date ?? ''}
					onChange={(event) =>
						setFormData((prev) => ({
							...prev,
							closing_date: event.target.value || null,
						}))
					}
					className='rounded-xl border border-black/10 bg-transparent px-4 py-2.5 dark:border-white/15'
				/>
			</label>

			<div className='flex items-center justify-between gap-4'>
				<label className='flex min-w-0 flex-1 items-center gap-3 text-sm'>
					<input
						type='checkbox'
						checked={formData.closed}
						onChange={(event) =>
							setFormData((prev) => ({
								...prev,
								closed: event.target.checked,
							}))
						}
						className='size-4 shrink-0 rounded border-black/10 dark:border-white/15'
					/>
					<span className='truncate font-medium'>Mark as closed</span>
				</label>

				<div className='shrink-0'>
					<Button
						type='submit'
						text={isPending ? 'Saving…' : 'Save changes'}
					/>
				</div>
			</div>
		</form>
	);
}
