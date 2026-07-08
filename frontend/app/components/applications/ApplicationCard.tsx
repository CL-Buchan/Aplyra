import Pill from '@/app/components/ui/Pill';
import {
	formatRelativeDate,
	getClosingInsight,
	getUrgencyLevel,
} from '@/app/helpers/applicationInsights';
import {
	ApplicationWithCompany,
	getStatusConfig,
} from '@/app/types/application.types';
import { Building07, MarkerPin01 } from '@untitledui/icons';
import clsx from 'clsx';
import Link from 'next/link';

const urgencyAccent: Record<ReturnType<typeof getUrgencyLevel>, string> = {
	none: 'border-l-transparent',
	soon: 'border-l-amber-500',
	overdue: 'border-l-red-500',
};

export default function ApplicationCard({
	application,
}: {
	application: ApplicationWithCompany;
}) {
	const statusConfig = getStatusConfig(application.status);
	const urgency = getUrgencyLevel(
		application.closing_date,
		application.closed,
	);
	const companyName = application.company?.name ?? 'Unknown company';
	const location = application.company?.location;

	return (
		<Link
			href={`/applications/${application.id}`}
			className={clsx(
				'group block w-full rounded-2xl border border-black/10 bg-white/60 p-6',
				'border-l-4 transition-all duration-300 ease-in-out',
				'dark:border-white/15 dark:bg-white/5',
				'hover:border-black/20 hover:bg-white/80 dark:hover:border-white/25 dark:hover:bg-white/10',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
				urgencyAccent[urgency],
			)}>
			<div className='flex items-start justify-between gap-4'>
				<h3 className='text-lg font-semibold tracking-tight'>
					{application.role ?? 'Untitled role'}
				</h3>
				<Pill
					text={statusConfig.label}
					styles={{
						hexColour: statusConfig.hexColour,
						opacity: '25%',
					}}
				/>
			</div>

			<div className='mt-3 flex flex-col gap-1.5 text-sm text-muted'>
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

			<div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-tight text-muted'>
				<span>{formatRelativeDate(application.applied_at)}</span>
				<span aria-hidden='true'>·</span>
				<span>
					{getClosingInsight(
						application.closing_date,
						application.closed,
					)}
				</span>
			</div>
		</Link>
	);
}
