import Button from '@/app/components/ui/Button';
import RadialGlow from '@/app/components/ui/RadialGlow';
import { Badge } from '@/app/components/ui/Badge';
import { Mark } from '@/app/components/ui/Mark';
import Footer from '@/app/components/ui/Footer';

export default function UnsubscribedConfirmation() {
	return (
		<div className='w-full flex flex-col items-center font-sans overflow-x-hidden min-h-screen'>
			<main className='relative w-full max-w-5xl px-6 flex-1 flex flex-col items-center justify-center text-center py-20'>
				<RadialGlow
					width={700}
					height={500}
					className='-top-10 left-1/2 -translate-x-1/2 opacity-25 dark:opacity-40 pointer-events-none'
				/>

				<div className='relative z-10 flex flex-col items-center'>
					<Mark size={40} className='mb-7' />

					<Badge indicator={false} bgColour='grey' className='mb-7'>
						Unsubscribed
					</Badge>

					<h1 className='text-xl md:text-3xl leading-[1.1] font-semibold tracking-tighter text-black dark:text-white'>
						You&apos;ve been unsubscribed.
					</h1>
					<p className='mt-8 max-w-sm text-base text-[#888888] leading-relaxed'>
						We&apos;re sorry to see you go. You won&apos;t receive
						any further emails from Aplyra&apos;s waitlist.
					</p>

					<Button
						text='Back to home'
						className='shrink-0 mt-8 px-[20px] h-[36px] bg-brand-purple rounded-[16px] text-[13px] font-normal text-white dark:text-black'
						redirectTo='/'
					/>
				</div>
			</main>

			<Footer />
		</div>
	);
}
