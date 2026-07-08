import { Tables } from '@/app/types/database.types';

export type ApplicationStatus =
	| 'Applied'
	| 'Interview'
	| 'Offer'
	| 'Rejected'
	| 'Withdrawn';

export const APPLICATION_STATUSES: ApplicationStatus[] = [
	'Applied',
	'Interview',
	'Offer',
	'Rejected',
	'Withdrawn',
];

export type ApplicationWithCompany = Tables<'applications'> & {
	company: Pick<Tables<'company'>, 'name' | 'location'> | null;
};

export type ApplicationUpdatePayload = {
	status: string;
	role: string;
	applied_at: string | null;
	closing_date: string | null;
	closed: boolean;
};

export type StatusConfig = { label: string; hexColour: string };

export const STATUS_CONFIG: Record<ApplicationStatus, StatusConfig> = {
	Applied: { label: 'Applied', hexColour: '0000FF' },
	Interview: { label: 'Interview', hexColour: '9333EA' },
	Offer: { label: 'Offer', hexColour: '16A34A' },
	Rejected: { label: 'Rejected', hexColour: 'DC2626' },
	Withdrawn: { label: 'Withdrawn', hexColour: '737373' },
};

export function getStatusConfig(status: string | null): StatusConfig {
	if (!status) {
		return { label: 'Unknown', hexColour: '737373' };
	}

	const normalised = status.trim();
	const match = APPLICATION_STATUSES.find(
		(s) => s.toLowerCase() === normalised.toLowerCase(),
	);

	if (match) return STATUS_CONFIG[match];

	return { label: normalised, hexColour: '737373' };
}
