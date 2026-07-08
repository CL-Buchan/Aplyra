export type UrgencyLevel = 'none' | 'soon' | 'overdue';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): Date {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function daysBetween(from: Date, to: Date): number {
	const diff = startOfDay(to).getTime() - startOfDay(from).getTime();
	return Math.round(diff / MS_PER_DAY);
}

export function formatRelativeDate(
	isoDate: string | null,
	prefix = 'Applied',
): string {
	if (!isoDate) return `${prefix} — date unknown`;

	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return `${prefix} — date unknown`;

	const daysAgo = daysBetween(date, new Date());

	if (daysAgo === 0) return `${prefix} today`;
	if (daysAgo === 1) return `${prefix} yesterday`;
	if (daysAgo > 1) return `${prefix} ${daysAgo} days ago`;
	if (daysAgo === -1) return `${prefix} tomorrow`;
	return `${prefix} in ${Math.abs(daysAgo)} days`;
}

export function getClosingInsight(
	closingDate: string | null,
	closed: boolean | null,
): string {
	if (closed) return 'Closed';

	if (!closingDate) return 'No closing date';

	const date = new Date(closingDate);
	if (Number.isNaN(date.getTime())) return 'No closing date';

	const daysRemaining = daysBetween(new Date(), date);

	if (daysRemaining < 0) return 'Closing date passed';
	if (daysRemaining === 0) return 'Closes today';
	if (daysRemaining === 1) return 'Closes tomorrow';
	return `Closes in ${daysRemaining} days`;
}

export function getUrgencyLevel(
	closingDate: string | null,
	closed: boolean | null,
): UrgencyLevel {
	if (closed || !closingDate) return 'none';

	const date = new Date(closingDate);
	if (Number.isNaN(date.getTime())) return 'none';

	const daysRemaining = daysBetween(new Date(), date);

	if (daysRemaining < 0) return 'overdue';
	if (daysRemaining <= 7) return 'soon';
	return 'none';
}

export function toDateInputValue(isoDate: string | null): string {
	if (!isoDate) return '';

	const date = new Date(isoDate);
	if (Number.isNaN(date.getTime())) return '';

	return date.toISOString().slice(0, 10);
}
