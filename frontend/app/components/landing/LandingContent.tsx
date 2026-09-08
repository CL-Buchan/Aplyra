'use client';

import { useEffect, useRef } from 'react';
import posthog from 'posthog-js';
import { AppContextProvider } from '../../providers/AppContext';
import RadialGlow from '../ui/RadialGlow';
import { Badge } from '../ui/Badge';
import { Mark } from '../ui/Mark';
import Footer from '../ui/Footer';
import DashboardPreview from './DashboardPreview';
import ApplicationBoardPreview from './ApplicationBoardPreview';
import FeatureRoadmap from './FeatureRoadmap';
import Faq from './Faq';
import SocialProof from './SocialProof';
import WaitlistProvider from './WaitlistProvider';
import WaitlistForm from './WaitlistForm';

export default function LandingContent({
	waitlistCount,
}: {
	waitlistCount: number;
}) {
	const ctaSectionRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const el = ctaSectionRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					posthog.capture('landing_more_info_viewed');
					observer.disconnect();
				}
			},
			{ threshold: 0.5 },
		);
		observer.observe(el);

		return () => observer.disconnect();
	}, []);

	return (
		<AppContextProvider>
			<WaitlistProvider>
				<div className='relative w-full flex flex-col items-center font-sans overflow-x-hidden'>
					<main className='relative w-full max-w-5xl px-6 flex flex-col gap-28 md:gap-36 pt-32 pb-24'>
						{/* Hero */}
						<section className='w-full flex flex-col items-center text-center'>
							<RadialGlow
								width={900}
								height={600}
								className='-top-50 left-1/2 -translate-x-1/2 opacity-30 dark:opacity-45 pointer-events-none'
							/>

							<div className='relative z-10 flex flex-col items-center'>
								<Badge className='mb-7'>
									Early access opening soon
								</Badge>

								<h1 className='text-4xl! md:text-6xl! leading-[1.12]! font-semibold tracking-tighter'>
									<span className='block text-muted'>
										Writing cover letters is a chore.
									</span>
									<span className='block'>
										Aplyra writes them{' '}
										<span className='underline'>
											for you.
										</span>
									</span>
								</h1>

								<p className='mt-6 max-w-md text-muted text-base leading-relaxed'>
									AI writes a tailored cover letter for every
									role in seconds, and tracks each application
									from submit to offer — no spreadsheet
									required.
								</p>

								<WaitlistForm location='hero' />

								<SocialProof count={waitlistCount} />
							</div>

							<DashboardPreview />
						</section>

						{/* From job post to letter */}
						<section id='how-it-works'>
							<div className='grid md:grid-cols-2 gap-10 mb-16'>
								<h2 className='text-3xl! md:text-5xl! leading-[1.05]! font-semibold tracking-tighter text-black dark:text-white'>
									From job post to
									<br />
									personalised letter.
								</h2>
								<p className='max-w-md text-muted text-base leading-relaxed'>
									Paste in a listing, get a letter written for
									that exact role, and watch the application
									move across one board until it&apos;s done.
								</p>
							</div>

							<FeatureRoadmap />
						</section>

						{/* Application board preview */}
						<section className='relative flex flex-col items-center text-center'>
							<Badge className='mb-8'>
								One board, from application to offer
							</Badge>

							<h2 className='sr-only'>
								Track every job application on one board
							</h2>

							<div aria-hidden className='w-full'>
								<ApplicationBoardPreview />
							</div>
						</section>

						{/* FAQ */}
						<Faq />

						{/* Final CTA */}
						<section
							ref={ctaSectionRef}
							id='more-information'
							className='relative flex flex-col items-center text-center'>
							<RadialGlow
								width={700}
								height={500}
								className='-top-10 left-1/2 -translate-x-1/2 opacity-25 dark:opacity-50 pointer-events-none'
							/>

							<div className='relative z-10 flex flex-col items-center'>
								<Mark size={40} className='mb-7' />

								<Badge
									indicator={false}
									bgColour='grey'
									className='mb-7'>
									Join the waitlist
								</Badge>

								<h2 className='text-3xl md:text-4xl leading-[1.15] font-semibold tracking-tighter text-black dark:text-white'>
									Your spot is{' '}
									<em className='italic'>waiting</em>.
								</h2>
								<p className='mt-3 max-w-sm text-sm text-muted leading-relaxed'>
									One place to track every application,
									follow-up and offer. We&apos;ll email you
									the moment early access opens.
								</p>

								<WaitlistForm location='cta' />

								<SocialProof count={waitlistCount} />
							</div>
						</section>
					</main>

					<Footer />
				</div>
			</WaitlistProvider>
		</AppContextProvider>
	);
}
