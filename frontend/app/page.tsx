'use client';

import Pill from './components/ui/Pill';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { useEffect, useRef, useState } from 'react';
import { AppContextProvider } from './providers/AppContext';
import RadialGlow from './components/ui/RadialGlow';
import Carousel from './components/Carousel';
import { Content } from './types/types';
import { Paperclip } from '@untitledui/icons';
import posthog from 'posthog-js';
import { createClient } from './services/supabase/client';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Home() {
	const moreInfoElement = useRef<HTMLElement | null>(null);
	const topGlowRef = useRef<HTMLDivElement | null>(null);
	const bottomGlowRef = useRef<HTMLDivElement | null>(null);
	const backdropImages = useRef<HTMLImageElement | null>(null);

	const [email, setEmail] = useState('');
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle');
	const [errorMessage, setErrorMessage] = useState('');

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
			if (
				!topGlowRef.current ||
				!bottomGlowRef.current ||
				!backdropImages.current
			)
				return;

			const speed = 0.3;
			const scrollYPosition = window.scrollY;
			if (scrollYPosition === 0) return;

			const parallaxItemSpeed = scrollYPosition * speed;
			topGlowRef.current.style.transform = `translateY(${parallaxItemSpeed}px)`;
			backdropImages.current.style.transform = `translateY(${parallaxItemSpeed}px)`;
			bottomGlowRef.current.style.transform = `translateY(-${parallaxItemSpeed}px)`;
		};

		window.addEventListener('scroll', handleScroll);

		// Removes the cleanup function
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	async function handleWaitlistSubmit() {
		if (status === 'loading') return;

		if (!EMAIL_REGEX.test(email)) {
			setStatus('error');
			setErrorMessage('Enter a valid email address.');
			return;
		}

		setStatus('loading');
		const supabase = createClient();
		const { error } = await supabase
			.from('waitlist')
			.insert({ email });

		if (error) {
			posthog.capture('waitlist_signup_failed', {
				reason: error.code === '23505' ? 'duplicate' : 'unknown',
			});
			setStatus('error');
			setErrorMessage(
				error.code === '23505'
					? "You're already on the list!"
					: 'Something went wrong, please try again.',
			);
			return;
		}

		posthog.capture('waitlist_signup');
		setStatus('success');
	}

	// Images to pass to carousel
	const images: Content[] = [
		{ path: '', imgDesc: '' },
		{ path: '', imgDesc: '' },
		{ path: '', imgDesc: '' },
		{ path: '', imgDesc: '' },
	];

	return (
		<AppContextProvider>
			<div className='relative w-full flex flex-col flex-1 items-center justify-center font-sans'>
				{/* Radial glows */}
				<RadialGlow ref={topGlowRef} />
				<RadialGlow ref={bottomGlowRef} className='bottom-0 right-0' />

				{/* Main content */}
				<main className='max-w-200 py-20 flex flex-col justify-start items-center gap-15 z-20'>
					<div className='relative py-31.25 card card--col card--center'>
						<div className='flex flex-col'>
							<h1 className='text-muted tracking-tight font-semibold'>
								Job hunting is overwhelming.
							</h1>
							<h1 className='tracking-tighter font-semibold'>
								Trove keeps you{' '}
								<span className='underline'>organised.</span>
							</h1>
						</div>

						<Button
							onClick={() => {
								posthog.capture('waitlist_cta_clicked', {
									location: 'hero',
								});
								moreInfoElement.current?.scrollIntoView({
									behavior: 'smooth',
									block: 'center',
								});
							}}
							variant='secondary'
							className='mt-5 bg-brand-blue'
							redirectTo=''
							text='Join the Waitlist'
						/>

						{/* Icon for background */}
						<Paperclip
							className='right-0 bottom-0 absolute z-0 translate-x-125 translate-y-50'
							opacity={0.025}
							height={800}
							width={800}
						/>
					</div>

					<div className='py-31.25 w-full flex flex-col justify-center items-center gap-10'>
						<Carousel textPosition='top' content={[]}>
							<div className='w-full flex flex-row justify-between items-end'>
								<h2 className='text-3xl!'>
									Simplify. Track. <br />
									<span className='text-5xl! tracking-tighter! font-semibold'>
										Apply for More
									</span>
								</h2>

								<Pill
									text='Limited Spots'
									styles={{
										hexColour: '0000FF',
										opacity: '100%',
									}}
								/>
							</div>
						</Carousel>
					</div>

					<div className='py-31.25'>
						<div
							id='more-information'
							className='w-full card card--col card--start banner-card backdrop-blur-3xl gap-5'>
							<h2 className='tracking-tighter'>
								Be first through the door.
							</h2>
							<p>
								Trove is in the works — one place to track
								every application, follow-up, and offer,
								instead of a spreadsheet you forget to update.
								Join the waitlist and we&apos;ll email you the
								moment early access opens.
							</p>

							{status === 'success' ? (
								<p className='text-brand-blue font-semibold'>
									You&apos;re on the list — we&apos;ll be in
									touch.
								</p>
							) : (
								<form
									onSubmit={(e) => {
										e.preventDefault();
										handleWaitlistSubmit();
									}}
									className='w-full flex flex-col sm:flex-row items-start sm:items-center gap-2.5'>
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
									/>
									<Button
										type='submit'
										variant='secondary'
										className='bg-brand-blue shrink-0'
										disabled={status === 'loading'}
										text={
											status === 'loading'
												? 'Joining...'
												: 'Join the Waitlist'
										}
									/>
								</form>
							)}

							{status === 'error' && (
								<p className='text-red-500 text-sm'>
									{errorMessage}
								</p>
							)}
						</div>
					</div>
				</main>
			</div>
		</AppContextProvider>
	);
}
