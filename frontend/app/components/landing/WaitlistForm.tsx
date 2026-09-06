'use client';

import clsx from 'clsx';
import { ArrowNarrowRight, CheckCircle } from '@untitledui/icons';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useWaitlist } from './WaitlistProvider';

interface WaitlistFormProps {
	location: 'hero' | 'cta';
	className?: string;
}

export default function WaitlistForm({ location, className }: WaitlistFormProps) {
	const { email, setEmail, status, errorMessage, submit } = useWaitlist();

	const inputId = `waitlist-email-${location}`;
	const errorId = `waitlist-error-${location}`;

	if (status === 'success') {
		return (
			<div
				role='status'
				className={clsx(
					'mt-8 inline-flex items-center gap-2.5 rounded-full border border-brand-purple/25 bg-brand-purple/10 px-4 py-2.5 text-sm font-medium text-brand-purple',
					className,
				)}>
				<CheckCircle width={16} height={16} />
				You&apos;re on the list — we&apos;ll email you when early access
				opens.
			</div>
		);
	}

	const isCta = location === 'cta';

	return (
		<div className={clsx('mt-8 w-full', isCta ? 'max-w-md' : 'max-w-sm', className)}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					submit(location);
				}}
				noValidate
				className={clsx(
					'flex gap-2 border border-border bg-white/30 backdrop-blur-3xl dark:bg-surface dark:backdrop-blur-none',
					isCta ? 'rounded-[14px] p-2' : 'rounded-[9px] p-1.25',
				)}>
				<label htmlFor={inputId} className='sr-only'>
					Email address
				</label>
				<input
					id={inputId}
					type='email'
					name={inputId}
					inputMode='email'
					autoComplete='email'
					placeholder='you@example.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					aria-invalid={status === 'error'}
					aria-describedby={status === 'error' ? errorId : undefined}
					className={clsx(
						'flex-1 min-w-0 bg-transparent border-none text-sm placeholder:text-[#595959] focus:outline-none',
						isCta ? 'h-11 px-3.5' : 'h-9.5 px-3',
					)}
				/>
				<button
					type='submit'
					disabled={status === 'loading'}
					className={clsx(
						'shrink-0 flex items-center justify-center rounded-md bg-brand-purple font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60',
						isCta ? 'h-11 px-5 text-sm' : 'w-9.5 h-9.5',
					)}>
					{status === 'loading' ? (
						<LoadingSpinner colour='#ffffff' />
					) : isCta ? (
						'Join the waitlist'
					) : (
						<>
							<span className='sr-only'>Join the waitlist</span>
							<ArrowNarrowRight width={16} height={16} />
						</>
					)}
				</button>
			</form>

			<p
				id={errorId}
				role='alert'
				className={clsx(
					'mt-2 text-sm text-red-500 transition-opacity',
					status === 'error' ? 'opacity-100' : 'opacity-0',
				)}>
				{errorMessage || ' '}
			</p>
		</div>
	);
}
