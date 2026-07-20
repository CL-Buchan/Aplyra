import ApplicationEditForm from '@/app/components/applications/ApplicationEditForm';
import Pill from '@/app/components/ui/Pill';
import Wrapper from '@/app/components/Wrapper';
import {
	formatRelativeDate,
	getClosingInsight,
} from '@/app/helpers/applicationInsights';
import { createClient } from '@/app/services/supabase/server';
import {
	ApplicationWithCompany,
	getStatusConfig,
} from '@/app/types/application.types';
import { Building07, MarkerPin01 } from '@untitledui/icons';
import { notFound } from 'next/navigation';

export default async function ApplicationDetail({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) notFound();

	const { data, error } = await supabase
		.from('applications')
		.select('*, company:company_id (name, location)')
		.eq('id', id)
		.eq('user_id', user.id)
		.single();

	if (error || !data) notFound();

	const application = data as ApplicationWithCompany;
	const statusConfig = getStatusConfig(application.status);
	const companyName = application.company?.name ?? 'Unknown company';
	const location = application.company?.location;

	return (
		<Wrapper>
			<div className='w-full flex flex-col flex-1 items-center justify-center font-sans'>
				<main className='max-w-200 py-25 flex w-full flex-col justify-start items-start gap-10 px-6'>
					<div className='flex flex-col w-full gap-2'>
						<div className='flex flex-wrap items-center gap-3'>
							<h2>{application.role ?? 'Untitled role'}</h2>
							<Pill
								text={statusConfig.label}
								styles={{
									hexColour: statusConfig.hexColour,
									opacity: '25%',
								}}
							/>
						</div>
						<p className='text-sm text-muted'>
							Application #{application.id}
						</p>
					</div>

					<div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-2'>
						<section className='flex flex-col gap-6 rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/15 dark:bg-white/5'>
							<h3 className='text-lg font-semibold tracking-tight'>
								Overview
							</h3>

							<div className='flex flex-col gap-4 text-sm'>
								<div className='flex items-center gap-2'>
									<Building07 className='size-4 shrink-0 opacity-60' />
									<span>{companyName}</span>
								</div>
								{location && (
									<div className='flex items-center gap-2'>
										<MarkerPin01 className='size-4 shrink-0 opacity-60' />
										<span>{location}</span>
									</div>
								)}
							</div>

							<div className='flex flex-col gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10'>
								<div className='flex justify-between gap-4'>
									<span className='text-muted'>Applied</span>
									<span>
										{formatRelativeDate(
											application.applied_at,
										)}
									</span>
								</div>
								<div className='flex justify-between gap-4'>
									<span className='text-muted'>Closing</span>
									<span>
										{getClosingInsight(
											application.closing_date,
											application.closed,
										)}
									</span>
								</div>
								<div className='flex justify-between gap-4'>
									<span className='text-muted'>
										Listing status
									</span>
									<span>
										{application.closed ? 'Closed' : 'Open'}
									</span>
								</div>
							</div>
						</section>

						<ApplicationEditForm application={application} />
					</div>
				</main>
			</div>
		</Wrapper>
	);
}
