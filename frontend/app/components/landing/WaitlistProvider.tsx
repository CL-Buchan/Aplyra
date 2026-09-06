'use client';

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import posthog from 'posthog-js';
import { toast } from 'sonner';
import Modal from '../ui/Modal';
import Input from '../ui/Input';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'loading' | 'success' | 'error';

interface WaitlistContextValue {
	email: string;
	setEmail: (value: string) => void;
	status: Status;
	errorMessage: string;
	submit: (location: string) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist() {
	const ctx = useContext(WaitlistContext);
	if (!ctx) {
		throw new Error('useWaitlist must be used within a WaitlistProvider');
	}
	return ctx;
}

export default function WaitlistProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [email, setEmailState] = useState('');
	const [firstName, setFirstName] = useState('');
	const [status, setStatus] = useState<Status>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const [location, setLocation] = useState('hero');
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);
	const [nameError, setNameError] = useState('');

	const setEmail = useCallback((value: string) => {
		setEmailState(value);
		setStatus((prev) => (prev === 'error' ? 'idle' : prev));
	}, []);

	const sendRequest = useCallback(
		async (name: string, eventLocation: string) => {
			setStatus('loading');

			try {
				const res = await fetch('/api/waitlist', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, name }),
				});

				if (!res.ok) {
					const { error, code } = await res
						.json()
						.catch(() => ({
							error: 'Something went wrong, please try again.',
						}));
					posthog.capture('waitlist_signup_failed', {
						location: eventLocation,
						reason: code === '23505' ? 'duplicate' : 'unknown',
					});
					setStatus('error');
					setErrorMessage(error);
					toast.error(error);
					return;
				}

				posthog.capture('waitlist_signup', { location: eventLocation });
				setStatus('success');
				toast.success("You're on the waitlist!");
			} catch {
				setStatus('error');
				setErrorMessage('Something went wrong, please try again.');
				toast.error('Something went wrong, please try again.');
			}
		},
		[email],
	);

	const submit = useCallback(
		(eventLocation: string) => {
			if (status === 'loading') return;

			setLocation(eventLocation);

			if (!EMAIL_REGEX.test(email)) {
				setStatus('error');
				setErrorMessage('Enter a valid email address.');
				return;
			}

			if (!firstName.trim()) {
				setNameError('');
				setIsNameModalOpen(true);
				return;
			}

			sendRequest(firstName.trim(), eventLocation);
		},
		[email, firstName, status, sendRequest],
	);

	const handleNameContinue = useCallback(() => {
		if (!firstName.trim()) {
			setNameError('Enter your first name to continue.');
			return;
		}
		setNameError('');
		setIsNameModalOpen(false);
		sendRequest(firstName.trim(), location);
	}, [firstName, location, sendRequest]);

	const value = useMemo<WaitlistContextValue>(
		() => ({ email, setEmail, status, errorMessage, submit }),
		[email, setEmail, status, errorMessage, submit],
	);

	return (
		<WaitlistContext.Provider value={value}>
			{children}

			<Modal
				isOpen={isNameModalOpen}
				onClose={() => setIsNameModalOpen(false)}
				header={{
					title: 'What should we call you?',
					description:
						'We use your first name to personalise your emails.',
				}}
				isLoading={status === 'loading'}
				footer={{
					buttons: [
						{
							text: 'Cancel',
							onClick: () => setIsNameModalOpen(false),
						},
						{
							text: 'Continue',
							disabled: status === 'loading',
							onClick: handleNameContinue,
						},
					],
				}}
				styles={{ titleSize: 24 }}>
				<div className='w-full flex flex-col gap-1.5'>
					<label htmlFor='waitlist-first-name' className='sr-only'>
						First name
					</label>
					<Input
						type='text'
						name='waitlist-first-name'
						placeholder='e.g. Jane'
						required
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
							if (nameError) setNameError('');
						}}
					/>
					{nameError && (
						<p className='text-red-500 text-xs' role='alert'>
							{nameError}
						</p>
					)}
				</div>
			</Modal>
		</WaitlistContext.Provider>
	);
}
