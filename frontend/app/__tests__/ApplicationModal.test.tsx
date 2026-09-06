import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationModal from '../components/applications/ApplicationModal';

const insertMock = vi.fn(async (_rows: Record<string, unknown>[]) => ({
	data: null,
	error: null as { message: string } | null,
}));

const companySelectMock = vi.fn(async () => ({
	data: [{ id: 1, name: 'Acme Corp' }],
	error: null as { message: string } | null,
}));
const companyUpsertMock = vi.fn(() => ({ select: companySelectMock }));

const fromMock = vi.fn((table: string) =>
	table === 'company'
		? { upsert: companyUpsertMock }
		: { insert: insertMock },
);

const getUserMock = vi.fn(async () => ({
	data: { user: { id: 'user-1' } },
	error: null,
}));

vi.mock('@/app/services/supabase/client', () => ({
	createClient: () => ({ from: fromMock, auth: { getUser: getUserMock } }),
}));

function addJobButton() {
	return screen.getByRole('button', { name: 'Add Job' });
}

function submitButton(count: number) {
	return screen.getByRole('button', { name: `Submit (${count})` });
}

async function fillValidApplication(user: ReturnType<typeof userEvent.setup>) {
	await user.type(screen.getByLabelText('Role'), 'Frontend Engineer');
	await user.type(screen.getByLabelText('Company'), 'Acme Corp');
	await user.type(screen.getByLabelText('Location'), 'Remote');
	await user.selectOptions(screen.getByLabelText('Status'), 'Applied');
	await user.type(screen.getByLabelText('Applied Date'), '2026-07-01');
	await user.type(screen.getByLabelText('Closing Date'), '2026-08-01');
	await user.type(
		screen.getByLabelText('Job Description'),
		'Build and maintain the app.',
	);
}

describe('ApplicationModal', () => {
	beforeEach(() => {
		insertMock.mockClear();
		fromMock.mockClear();
		companyUpsertMock.mockClear();
		companySelectMock.mockClear();
		getUserMock.mockClear();
	});

	it('disables Add Job until every required field has a value', async () => {
		const user = userEvent.setup();
		render(<ApplicationModal isOpen onClose={vi.fn()} />);

		expect(addJobButton()).toBeDisabled();

		await user.type(screen.getByLabelText('Role'), 'Frontend Engineer');
		expect(addJobButton()).toBeDisabled();

		await fillValidApplication(user);
		expect(addJobButton()).toBeEnabled();
	});

	it('queues an application on Add Job and resets the form', async () => {
		const user = userEvent.setup();
		render(<ApplicationModal isOpen onClose={vi.fn()} />);

		await fillValidApplication(user);
		await user.click(addJobButton());

		expect(submitButton(1)).toBeEnabled();
		// form should be cleared for the next entry
		expect(screen.getByLabelText('Role')).toHaveValue('');
		expect(addJobButton()).toBeDisabled();
	});

	it('keeps Submit disabled with zero queued applications', () => {
		render(<ApplicationModal isOpen onClose={vi.fn()} />);
		expect(submitButton(0)).toBeDisabled();
	});

	it('submits all queued applications in a single batch insert', async () => {
		const onClose = vi.fn();
		const user = userEvent.setup();
		render(<ApplicationModal isOpen onClose={onClose} />);

		await fillValidApplication(user);
		await user.click(addJobButton());

		await fillValidApplication(user);
		await user.click(addJobButton());

		const submit = submitButton(2);
		expect(submit).toBeEnabled();
		await user.click(submit);

		await waitFor(() => expect(insertMock).toHaveBeenCalledTimes(1));
		expect(fromMock).toHaveBeenCalledWith('applications');

		expect(fromMock).toHaveBeenCalledWith('company');
		expect(companyUpsertMock).toHaveBeenCalledWith(
			[{ name: 'Acme Corp' }],
			{ onConflict: 'name' },
		);

		const inserted = insertMock.mock.calls[0][0];
		expect(inserted).toHaveLength(2);
		expect(inserted[0]).toMatchObject({
			user_id: 'user-1',
			role: 'Frontend Engineer',
			company_id: 1,
			applied_at: '2026-07-01',
			closing_date: '2026-08-01',
			status: 'Applied',
			job_description: 'Build and maintain the app.',
		});

		await waitFor(() => expect(onClose).toHaveBeenCalled());
	});

	it('does not close the modal or clear the queue when the insert fails', async () => {
		insertMock.mockResolvedValueOnce({
			data: null,
			error: { message: 'insert failed' },
		});
		const onClose = vi.fn();
		const user = userEvent.setup();
		render(<ApplicationModal isOpen onClose={onClose} />);

		await fillValidApplication(user);
		await user.click(addJobButton());
		await user.click(submitButton(1));

		await waitFor(() => expect(insertMock).toHaveBeenCalledTimes(1));
		expect(onClose).not.toHaveBeenCalled();
		expect(submitButton(1)).toBeInTheDocument();
	});
});
