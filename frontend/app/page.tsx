'use client';

import Pill from './components/ui/Pill';
import Button from './components/ui/Button';
import { useEffect, useRef } from 'react';
import { AppContextProvider } from './providers/AppContext';
import RadialGlow from './components/ui/RadialGlow';
import Carousel from './components/Carousel';
import { Content } from './types/types';

export default function Home() {
	const moreInfoElement = useRef<HTMLElement | null>(null);
	const topGlowRef = useRef<HTMLDivElement | null>(null);
	const bottomGlowRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		moreInfoElement.current = document.getElementById('more-information');
	}, []);

	// Scroll effect listener - background (radials) move slower than the content
	useEffect(() => {
		const handleScroll = () => {
			if (!topGlowRef.current || !bottomGlowRef.current) return;

			const speed = 0.3;
			const scrollYPosition = window.scrollY;
			if (scrollYPosition === 0) return;

			const parallaxItemSpeed = scrollYPosition * speed;
			topGlowRef.current.style.transform = `translateY(${parallaxItemSpeed}px)`;
			bottomGlowRef.current.style.transform = `translateY(-${parallaxItemSpeed}px)`;
		};

		window.addEventListener('scroll', handleScroll);

		// Removes the cleanup function
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

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
					<div className='py-31.25 card card--col card--center'>
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
							onClick={() =>
								moreInfoElement.current?.scrollIntoView({
									behavior: 'smooth',
									block: 'center',
								})
							}
							variant='secondary'
							className='mt-5 bg-brand-blue'
							redirectTo=''
							text='Join the Waitlist'
						/>
					</div>

					<div className='py-31.25 w-full flex flex-col justify-center items-center gap-10'>
						<Carousel content={[]} />
					</div>

					<div className='py-31.25'>
						<div
							id='more-information'
							className='w-full card card--col card--start banner-card backdrop-blur-3xl'>
							<h2 className='tracking-tighter'>
								More Information
							</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipisicing elit. Adipisci necessitatibus
								provident ullam excepturi distinctio quia
								voluptas ratione alias saepe dolore odit,
								possimus quasi sunt a numquam, quas fugit
								molestias consequuntur.
							</p>
						</div>
					</div>
				</main>
			</div>
		</AppContextProvider>
	);
}
