'use client';

import ApplicationModal from '@/app/components/applications/ApplicationModal';
import Button from '@/app/components/ui/Button';
import Pill from '@/app/components/ui/Pill';
import {
	ApplicationWithCompany,
	getStatusConfig,
} from '@/app/types/application.types';
import { Building07, DotsHorizontal, Plus } from '@untitledui/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export default function ApplicationsView({
	applications,
}: {
	applications: ApplicationWithCompany[];
}) {
	const [modalOpen, setModalOpen] = useState(false);
	const router = useRouter();

	return (
		<>
			<div className='w-full flex justify-between items-center'>
				<div className='flex items-center gap-2 text-sm text-muted'>
					<button
						type='button'
						className='py-1.5 px-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors duration-200 ease-in-out'>
						Status: All
					</button>
					<button
						type='button'
						className='py-1.5 px-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors duration-200 ease-in-out'>
						Sort: Newest
					</button>
				</div>

				<Button
					variant='none'
					className='flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white py-1.5! px-3.5! rounded-lg!'
					onClick={() => setModalOpen(true)}>
					<Plus className='size-4' />
					New Application
				</Button>
			</div>

			<div className='w-full flex flex-col gap-6'>
				{applications.length === 0 ? (
					<div className='w-full flex flex-col items-center gap-6 rounded-2xl border border-white/15 bg-white/5 p-10'>
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
					<div className='table-wrap w-full'>
						<table className='w-full table-fixed'>
							<colgroup>
								<col className='w-1/2' />
								<col className='w-1/6' />
								<col className='w-1/6' />
								<col className='w-16' />
							</colgroup>

							<thead>
								<tr>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Company &amp; Role
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Status
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Date Added
									</th>
									<th className='text-left text-xs uppercase tracking-wide text-muted'>
										Actions
									</th>
								</tr>
							</thead>

							<tbody>
								{applications.map((application) => {
									const statusConfig = getStatusConfig(
										application.status,
									);
									const companyName =
										application.company?.name ??
										'Unknown company';
									const role = application.role
										? application.role.slice(0, 1).toUpperCase() +
											application.role.slice(1).toLowerCase()
										: 'Untitled role';

									return (
										<tr
											key={application.id}
											onClick={() =>
												router.push(
													`/dashboard/applications/${application.id}`,
												)
											}
											className='cursor-pointer hover:bg-white/5 transition-colors duration-200 ease-in-out'>
											<td>
												<div className='flex items-center gap-3'>
													<div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10'>
														<Building07 className='size-4 opacity-70' />
													</div>
													<div className='min-w-0'>
														<p className='truncate font-medium'>
															{companyName}
														</p>
														<p className='truncate text-sm text-muted'>
															{role}
														</p>
													</div>
												</div>
											</td>
											<td>
												<Pill
													text={statusConfig.label}
													styles={{
														hexColour:
															statusConfig.hexColour,
														opacity: '25%',
													}}
												/>
											</td>
											<td className='text-sm text-muted'>
												{formatDateAdded(
													application.applied_at,
												)}
											</td>
											<td>
												<Link
													href={`/dashboard/applications/${application.id}`}
													onClick={(event) =>
														event.stopPropagation()
													}
													className='inline-flex size-8 items-center justify-center rounded-lg text-muted hover:bg-white/10 hover:text-white transition-colors duration-200 ease-in-out'>
													<DotsHorizontal className='size-4' />
												</Link>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
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
