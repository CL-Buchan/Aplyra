'use client';

import Pill from './components/ui/Pill';
import Button from './components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import { AppContextProvider } from './providers/AppContext';
import RadialGlow from './components/ui/RadialGlow';
import Carousel from './components/Carousel';
import { Content } from './types/types';
import { Paperclip } from '@untitledui/icons';

// Images
import Image1 from '@/public/assets/img-1.png';
import Image2 from '@/public/assets/img-2.png';
import Image3 from '@/public/assets/img-3.png';

export default function Home() {
	const moreInfoElement = useRef<HTMLElement | null>(null);
	const topGlowRef = useRef<HTMLDivElement | null>(null);
	const bottomGlowRef = useRef<HTMLDivElement | null>(null);
	const backdropImages = useRef<HTMLImageElement | null>(null);

	const [textVariants, setTextVariants] = useState('organised.');
	const [variantIndex, setVariantIndex] = useState(0);

	useEffect(() => {
		moreInfoElement.current = document.getElementById('more-information');
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

	// Images to pass to carousel
	const images: Content[] = [
		{ path: Image1.src, imgDesc: 'Image-1' },
		{ path: Image2.src, imgDesc: 'Image-2' },
		{ path: Image3.src, imgDesc: 'Image-3' },
	];

	const variants = ['agile.', 'ready.', 'collected.'];

	useEffect(() => {
		const alterateWords = () => {
			setInterval(() => {
				setVariantIndex((prev) => {
					const nextIndex =
						prev === variants.length - 1 ? 0 : prev + 1;
					setTextVariants(variants[nextIndex]);
					return nextIndex;
				});
			}, 5000);
		};

		alterateWords();
	}, []);

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
								<span className='underline'>
									{textVariants}
								</span>
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

						{/* Icon for background */}
						<Paperclip
							className='right-0 bottom-0 absolute z-0 translate-x-125 translate-y-50'
							opacity={0.125}
							height={800}
							width={800}
						/>
					</div>

					<div className='py-31.25 w-full flex flex-col justify-center items-center gap-10'>
						<Carousel textPosition='top' content={images}>
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
				</main>
			</div>
		</AppContextProvider>
	);
}
