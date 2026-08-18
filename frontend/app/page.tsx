'use client';

import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { useEffect, useRef, useState } from 'react';
import { AppContextProvider } from './providers/AppContext';
import RadialGlow from './components/ui/RadialGlow';
import { ArrowNarrowRight } from '@untitledui/icons';
import posthog from 'posthog-js';
import { Badge } from './components/ui/Badge';
import { Mark } from './components/ui/Mark';
import ApplicationBoardPreview from './components/landing/ApplicationBoardPreview';
import DashboardPreview from './components/landing/DashboardPreview';
import FeatureRoadmap from './components/landing/FeatureRoadmap';
import Footer from './components/ui/Footer';
import { toast } from 'sonner';
import Modal from './components/ui/Modal';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
	const moreInfoElement = useRef<HTMLElement | null>(null);
	const heroGlowRef = useRef<HTMLDivElement | null>(null);
	const ctaGlowRef = useRef<HTMLDivElement | null>(null);

	const [firstName, setFirstName] = useState('');
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');
	const [isNameModalOpen, setIsNameModalOpen] = useState(false);
	const [nameError, setNameError] = useState('');

	useEffect(() => {
		moreInfoElement.current = document.getElementById('more-information');

		if (!moreInfoElement.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					posthog.capture('landing_more_info_viewed');
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(moreInfoElement.current);

		return () => observer.disconnect();
	}, []);

	// Scroll effect listener - background (radials) move slower than the content
	useEffect(() => {
		const handleScroll = () => {
			if (!heroGlowRef.current) return;

			const speed = 0.3;
			const scrollYPosition = window.scrollY;

			const parallaxItemSpeed = scrollYPosition * speed;

			heroGlowRef.current.style.transform = `translateY(${parallaxItemSpeed}px)`;
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	function handleWaitlistSubmit() {
		if (status === 'loading') return;

		if (!EMAIL_REGEX.test(email)) {
			setStatus('error');
			setErrorMessage('Enter a valid email address.');
			return;
		}

		if (!firstName.trim()) {
			setIsNameModalOpen(true);
			return;
		}

		submitWaitlist();
	}

	function handleNameModalContinue() {
		if (!firstName.trim()) {
			setNameError('Enter your first name to continue.');
			return;
		}

		setNameError('');
		setIsNameModalOpen(false);
		submitWaitlist();
	}

	async function submitWaitlist() {
		setStatus('loading');
		const res = await fetch('/api/waitlist', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, name: firstName }),
		});

		if (!res.ok) {
			const { error, code } = await res
				.json()
				.catch(() => ({
					error: 'Something went wrong, please try again.',
				}));
			posthog.capture('waitlist_signup_failed', {
				reason: code === '23505' ? 'duplicate' : 'unknown',
			});
			setStatus('error');
			setErrorMessage(error);
			toast.error(error);
			return;
		}

		posthog.capture('waitlist_signup');
		setStatus('success');
		toast.success("You're in the waitlist!");
	}

	return (
		<AppContextProvider>
			<div className='relative w-full flex flex-col items-center font-sans overflow-x-hidden'>
				<main className='w-full max-w-5xl px-6 flex flex-col gap-24 md:gap-32 py-20'>
					{/* Hero */}
					<section className='w-full flex flex-col items-center text-center pt-[60px] pb-16'>
						<RadialGlow
							ref={heroGlowRef}
							width={900}
							height={600}
							className='-top-50 left-1/2 -translate-x-1/2 opacity-35 pointer-events-none'
						/>

						<div className='relative z-10 flex flex-col items-center'>
							<Badge className='mb-7'>
								Early access opening soon
							</Badge>

							<h1 className='text-muted text-4xl! md:text-6xl! leading-[1.12]! font-semibold tracking-tighter'>
								Writing cover letters is a chore.
							</h1>
							<h1 className='text-4xl! md:text-6xl! leading-[1.12]! font-semibold tracking-tighter'>
								Aplyra writes them{' '}
								<span className='underline'>for you.</span>
							</h1>

							<p className='mt-6 max-w-md text-[#888888] text-base leading-relaxed'>
								AI writes a tailored cover letter for every role
								in seconds, and tracks each application from
								submit to offer — no spreadsheet required.
							</p>

							{status === 'success' ? (
								<p className='mt-8 text-brand-purple font-semibold'>
									You&apos;re on the list — we&apos;ll be in
									touch.
								</p>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleWaitlistSubmit();
									}}
									className='mt-8 w-full max-w-sm flex gap-2 backdrop-blur-3xl dark:backdrop-blur-none bg-white/30 dark:bg-surface border border-border rounded-[9px] p-1.25'>
									<input
										type='email'
										name='waitlist-email-hero'
										placeholder='you@example.com'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
											if (status === 'error') {
												setStatus('idle');
											}
										}}
										className='flex-1 min-w-0 bg-transparent border-none h-[38px] px-3 text-white text-sm placeholder:text-[#595959] focus:outline-none'
									/>
									<button
										type='submit'
										disabled={status === 'loading'}
										aria-label='Join the waitlist'
										className='shrink-0 w-[38px] h-[38px] rounded-[6px] bg-brand-purple text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed'>
										<ArrowNarrowRight
											width={16}
											height={16}
										/>
									</button>
								</form>
							)}

							{status === 'error' && (
								<p className='mt-3 text-red-500 text-sm'>
									{errorMessage}
								</p>
							)}
						</div>

						{/* Product preview */}
						<DashboardPreview />
					</section>

					{/* From job post to letter */}
					<section id='how-it-works' className='pt-[64px] pb-[100px]'>
						<div className='grid md:grid-cols-2 gap-10 mb-16'>
							<h2 className='text-3xl! md:text-5xl! leading-[1.05]! font-semibold tracking-tighter text-black dark:text-white'>
								From job post to
								<br />
								personalised letter.
							</h2>
							<p className='max-w-md text-[#888888] text-base leading-relaxed'>
								Paste in a listing, get a letter written for
								that exact role, and watch the application move
								across one board until it&apos;s done.
							</p>
						</div>

						<FeatureRoadmap />
					</section>

					{/* Application board preview */}
					<section
						aria-hidden
						className='relative pt-[20px] pb-[90px] flex flex-col items-center'>
						<Badge className='mb-8'>
							One board, from application to offer
						</Badge>

						<ApplicationBoardPreview />
					</section>

					{/* Final CTA */}
					<section
						id='more-information'
						className='relative pb-[110px] flex flex-col items-center text-center'>
						<RadialGlow
							ref={ctaGlowRef}
							width={700}
							height={500}
							className='-top-10 left-1/2 -translate-x-1/2 opacity-40 pointer-events-none'
						/>

						<div className='relative z-10 flex flex-col items-center'>
							<Mark size={40} className='mb-7' />

							<Badge
								indicator={false}
								bgColour='grey'
								className='mb-7'>
								Join the Waitlist
							</Badge>

							<h2 className='text-3xl md:text-4xl leading-[1.15] font-semibold tracking-tighter text-black dark:text-white'>
								Your spot is <em className='italic'>waiting</em>
								.
							</h2>
							<p className='mt-3 max-w-sm text-sm text-[#888888] leading-relaxed'>
								One place to track every application, follow-up
								and offer. We&apos;ll email you the moment early
								access opens.
							</p>

							{status === 'success' ? (
								<p className='mt-8 text-brand-purple font-semibold'>
									You&apos;re on the list — we&apos;ll be in
									touch.
								</p>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleWaitlistSubmit();
									}}
									className='mt-8 w-full max-w-md flex gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-[20px] p-2.5'>
									<Input
										type='email'
										name='waitlist-email'
										placeholder='you@example.com'
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
											if (status === 'error') {
												setStatus('idle');
											}
										}}
										className='w-full max-w-sm flex gap-2 backdrop-blur-3xl dark:backdrop-blur-none bg-white/30 dark:bg-surface border border-border rounded-[9px] p-1.25'
									/>
									<Button
										type='submit'
										variant='secondary'
										className='bg-brand-purple shrink-0 rounded-xl text-white dark:text-black'
										disabled={status === 'loading'}
										text={
											status === 'loading'
												? 'Joining...'
												: 'Join'
										}
									/>
								</form>
							)}

							{status === 'error' && (
								<p className='mt-3 text-red-500 text-sm'>
									{errorMessage}
								</p>
							)}
						</div>
					</section>
				</main>

				<Footer />
			</div>

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
							disabled: false,
							onClick: handleNameModalContinue,
						},
					],
				}}
				styles={{ titleSize: 24 }}>
				<div className='w-full flex flex-col gap-1.5'>
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
						<p className='text-red-500 text-xs'>{nameError}</p>
					)}
				</div>
			</Modal>
		</AppContextProvider>
	);
}
